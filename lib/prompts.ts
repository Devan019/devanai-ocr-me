
export const getPromptForExtraction = (fileCategory: string) => {
  switch (fileCategory) {
    case 'image':
      return 'Extract text from the following image:';
    case 'pdf':
      return 'Extract text from the following PDF document:';
    case 'doc':
      return 'Extract text from the following document:';
    default:
      return 'Extract text from the following file:';
  }
}