/**
 * The function used to update the current css file with dynamic data for some blocks
 * 
 * @param { String } data - string with valid data to css 
 * 
*/

export default function createDynamicStyles ( data = "" ) {
    
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = data;
    document.head.appendChild(style);
    console.debug("Styles successfully added to css data.");
    
}