export function addClass(el,className){
	if(hasClass(el,className)){
		return;
	}
	let classArry = el.className.split(" ");
	classArry.push(className);
	el.className = classArry.join(" ");
}
export function hasClass(el,className){
	let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
	return reg.test(el.className);
}