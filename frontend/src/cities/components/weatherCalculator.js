// prettier-ignore

export const EvaluateWeatherId = (weatherId, size) => {
  const id = weatherId.toString();
  const firstChar = id[0];
  const lastChar = id[2];

  if(size === undefined)
  {
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
  }
  else{
      if (firstChar === '2'){
        return "mini-stormy";
    }      
    else if (firstChar === '3' || firstChar === '5'){
        return "mini-rainy";
    }      
    else if(firstChar === '6') {
        return "mini-snowy";
    }      
    else if (firstChar === '7'){
        return "mini-sunny";
    }      
    else if (firstChar === '8') {
        if (lastChar !== '0') {
            return "mini-cloudy";
          } else {
            return "mini-sunny";
          }    
    }
  }    
      
    return null;
};

export const EvaluateTimeHour = dateTimeString => {
  const dateText = dateTimeString.toString();
  return dateText.substring(11, 13);
};
