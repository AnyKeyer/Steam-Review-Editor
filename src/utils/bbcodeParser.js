/**
 * Steam BBCode Parser
 * Converts Steam BBCode tags to HTML for preview
 */

// Escape HTML to prevent XSS
const escapeHtml = (text) => {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// Parse BBCode to HTML
export const parseBBCode = (text) => {
  if (!text) return ''
  
  // First escape HTML
  let result = escapeHtml(text)
  
  // Headers
  result = result.replace(/\[h1\]([\s\S]*?)\[\/h1\]/gi, '<h1>$1</h1>')
  result = result.replace(/\[h2\]([\s\S]*?)\[\/h2\]/gi, '<h2>$1</h2>')
  result = result.replace(/\[h3\]([\s\S]*?)\[\/h3\]/gi, '<h3>$1</h3>')
  
  // Text formatting
  result = result.replace(/\[b\]([\s\S]*?)\[\/b\]/gi, '<strong>$1</strong>')
  result = result.replace(/\[i\]([\s\S]*?)\[\/i\]/gi, '<em>$1</em>')
  result = result.replace(/\[u\]([\s\S]*?)\[\/u\]/gi, '<u>$1</u>')
  result = result.replace(/\[strike\]([\s\S]*?)\[\/strike\]/gi, '<s>$1</s>')
  
  // Spoiler
  result = result.replace(
    /\[spoiler\]([\s\S]*?)\[\/spoiler\]/gi, 
    '<span class="spoiler" onclick="this.classList.toggle(\'revealed\')">$1</span>'
  )
  
  // Noparse - show content as-is
  result = result.replace(/\[noparse\]([\s\S]*?)\[\/noparse\]/gi, '<span class="noparse">$1</span>')
  
  // Horizontal rule
  result = result.replace(/\[hr\]\[\/hr\]/gi, '<hr>')
  result = result.replace(/\[hr\]/gi, '<hr>')
  
  // URL with text
  result = result.replace(
    /\[url=([^\]]+)\]([\s\S]*?)\[\/url\]/gi, 
    '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>'
  )
  
  // URL without text
  result = result.replace(
    /\[url\]([\s\S]*?)\[\/url\]/gi, 
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  )
  
  // Quote with author
  result = result.replace(
    /\[quote=([^\]]+)\]([\s\S]*?)\[\/quote\]/gi, 
    '<div class="quote"><div class="quote-author">Цитата от $1:</div>$2</div>'
  )
  
  // Quote without author
  result = result.replace(
    /\[quote\]([\s\S]*?)\[\/quote\]/gi, 
    '<div class="quote">$1</div>'
  )
  
  // Code block
  result = result.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, '<code>$1</code>')
  
  // Unordered list
  result = result.replace(/\[list\]([\s\S]*?)\[\/list\]/gi, (match, content) => {
    const items = content
      .split(/\[\*\]/)
      .filter(item => item.trim())
      .map(item => `<li>${item.trim()}</li>`)
      .join('')
    return `<ul>${items}</ul>`
  })
  
  // Ordered list
  result = result.replace(/\[olist\]([\s\S]*?)\[\/olist\]/gi, (match, content) => {
    const items = content
      .split(/\[\*\]/)
      .filter(item => item.trim())
      .map(item => `<li>${item.trim()}</li>`)
      .join('')
    return `<ol>${items}</ol>`
  })
  
  // Table
  result = result.replace(/\[table[^\]]*\]([\s\S]*?)\[\/table\]/gi, (match, content) => {
    let tableContent = content
    // Table rows
    tableContent = tableContent.replace(/\[tr\]([\s\S]*?)\[\/tr\]/gi, '<tr>$1</tr>')
    // Table headers
    tableContent = tableContent.replace(/\[th\]([\s\S]*?)\[\/th\]/gi, '<th>$1</th>')
    // Table cells
    tableContent = tableContent.replace(/\[td\]([\s\S]*?)\[\/td\]/gi, '<td>$1</td>')
    return `<table>${tableContent}</table>`
  })
  
  // Convert newlines to <br> (but not inside pre/code blocks)
  result = result.replace(/\n/g, '<br>')
  
  return result
}

// Convert HTML back to BBCode (for future use)
export const htmlToBBCode = (html) => {
  let result = html
  
  result = result.replace(/<h1>([\s\S]*?)<\/h1>/gi, '[h1]$1[/h1]')
  result = result.replace(/<h2>([\s\S]*?)<\/h2>/gi, '[h2]$1[/h2]')
  result = result.replace(/<h3>([\s\S]*?)<\/h3>/gi, '[h3]$1[/h3]')
  result = result.replace(/<strong>([\s\S]*?)<\/strong>/gi, '[b]$1[/b]')
  result = result.replace(/<b>([\s\S]*?)<\/b>/gi, '[b]$1[/b]')
  result = result.replace(/<em>([\s\S]*?)<\/em>/gi, '[i]$1[/i]')
  result = result.replace(/<i>([\s\S]*?)<\/i>/gi, '[i]$1[/i]')
  result = result.replace(/<u>([\s\S]*?)<\/u>/gi, '[u]$1[/u]')
  result = result.replace(/<s>([\s\S]*?)<\/s>/gi, '[strike]$1[/strike]')
  result = result.replace(/<br\s*\/?>/gi, '\n')
  
  return result
}
