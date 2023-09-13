export const formatDate = (date: string) => {
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = d.getMinutes();
  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};

export const extractFileNameFromUrl=(url: string): string | null=> {
    const keyword = 'chatgram-';
    const startIndex = url.indexOf(keyword);

    if (startIndex !== -1) {
        const fileName = url.substring(startIndex + keyword.length);
        return fileName;
    }
    return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const downloadMedia=(event:any, mediaUrl: string): void=> {
  event.preventDefault(); // Prevent any default behavior of the event (e.g., navigating to the URL)
  try{
    fetch(mediaUrl).then(resp=>resp.blob()).then(blob=>{
      const url=window.URL.createObjectURL(blob);
      const a=document.createElement('a');
      a.style.display="none";
      a.href=url;
      const nameSplit=mediaUrl.split("/");
      const name=nameSplit[nameSplit.length-1];
      a.download=""+name+"";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

    }).catch(()=>console.log("Error while downloading"));
  }
  catch(err){
    console.log("Error while downloading")
  }
}
