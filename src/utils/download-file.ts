const downloadFile = (
  content: string,
  fileName: string,
  mimeType = 'application/octet-stream'
) => {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type: mimeType }));
  a.setAttribute('download', fileName);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export default downloadFile;
