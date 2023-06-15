export const formartMessage = (message: string) => {
    return message
      .replaceAll('_', '\\_')
      .replaceAll('|', '\\|')
      .replaceAll('.', '\\.')
      .replaceAll('{', '\\{')
      .replaceAll('}', '\\}')
      .replaceAll('=', '\\=')
      .replaceAll('+', '\\+')
      .replaceAll('>', '\\>')
      .replaceAll('<', '\\<')
      .replaceAll('-', '\\-')
      .replaceAll('!', '\\!')
      .replaceAll('$', '\\$')
  }