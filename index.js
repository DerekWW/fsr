const turnToHtml = function(jsonArr) {
  let returnHtml = "";

  jsonArr.forEach( (each) => {
    if( typeof each.content === 'string') {
      returnHtml += `<${each.tag}>${each.content}</${each.tag}>`
    } else if (Array.isArray(each.content)){
      returnHtml += `<${each.tag}>${turnToHtml(each.content)}</${each.tag}>`
    } else if(typeof each.content === 'object') {
      returnHtml += `<${each.tag}>${turnToHtml([each.content])}</${each.tag}>`
    } else {
      returnHtml += `<` + each.tag + '>' + `<` + each.content.tag + '>' + each.content.content + '</' + each.content.tag + '>' + '</' + each.tag + '>'
    }
  })

  return returnHtml;
}

document.getElementById('fileInput').addEventListener('change', (event) => {
  let file = event.target.files[0];
  let reader = new FileReader();
  let json;

  if (file.type !== 'application/json') {
    Materialize.toast('Only upload a JSON file please', 4000);
    event.target.value = '';
    return;
  }

  reader.onload = (jsonFile) => {
    json = reader.result
    if (json.length === 0) {
      Materialize.toast('This JSON file cannot be empty. Try again', 4000);
      event.target.value = '';
      return;
    }

    json = JSON.parse(json);
    document.getElementById('append').innerHTML = turnToHtml(json);
  }

  reader.readAsText(file)
})

document,getElementById('clear').addEventListener('click', (event) => {
  document.getElementById('append').innerHTML = '';
})
