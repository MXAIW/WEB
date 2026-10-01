// JavaScript source code
let buttons = document.getElementsByTagName("button");
console.log(buttons);
//console.table(elemens);
let digitButtons = document.getElementsByClassName("digit-button");
console.log(digitButtons);
//for (let i = 1; i < digitButtons.length - 1; i++)
//{
//	for (len j = i + 1; j < digitButtons.length - 1; j++)
//	{
//		if (digitButtons[j], innerHTML < digitButtons[i].innerHTML)
//		{
//			//let buffer = digitButtons[i];
//			//digitButtons[i] = digitButtons[j];
//			//digitButtons[j] = buffer;
//			digitButtons[j] = [digitButtons[i], digitButtons[i] = digitButtons[j]][0];
//		}
//	}
//}

for (let i = 0; i < digitButtons.length; i++)
{
	//digitButtons[i].addEventListener("click", inputDigit);
	document.getElementById(`${i}`).addEventListener("click", inputDigit);
}
function inputDigit(event)
{
	let display = document.getElementById("display");
	if (display === '0') display.value = '';
	display.value += this.innerHTML;
	
	console.log(this);
}

document.onkeypress = function (e)
{
	console.log(e.key);
	if (e.key >= 0 && e.key <= 58)
	{
		//document.getElementById(`${e.key.charcode-48}`).
		document.getElementById("display").value += e.key;
		console.log("DIGIT");
	}
	console.log(e);
}