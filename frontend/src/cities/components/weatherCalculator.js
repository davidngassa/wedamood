// prettier-ignore

export const EvaluateWeatherId = weatherId => {
  const id = weatherId.toString();
  const firstChar = id[0];
  const lastChar = id[2];
  
    if (firstChar === '2'){
        return "stormy";
    }      
    else if (firstChar === '3' || firstChar === '5'){
        return "rainy";
    }      
    else if(firstChar === '6') {
        return "snowy";
    }      
    else if (firstChar === '7'){
        return "sunny";
    }      
    else if (firstChar === '8') {
        if (lastChar !== '0') {
            return "cloudy";
          } else {
            return "sunny";
          }    
    }
      
    return null;
};
