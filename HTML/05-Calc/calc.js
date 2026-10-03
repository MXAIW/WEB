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
	digitButtons[i].addEventListener("click", inputDigit);
	//document.getElementById(`${i}`).addEventListener("click", inputDigit);
}
function inputDigit()
{
	/*let display = document.getElementById("display");
	if (display.value === '0') display.value = '';
	display.value += this.innerHTML;
	console.log(this);*/
	digit2display(this.innerHTML);
}
function digit2display(digit)
{
	let display = document.getElementById("display");
	if (digit == ' ') return;
	if (display.value === '0') display.value = '';
	if (digit == '.' && digit.value.includes('.')) return;
	display.value += digit;
}

/*document.onkeypress = function (e)
{
	console.log(e.key);
	if (e.key >= 0 && e.key <= 9)
	{
		//document.getElementById(`${e.key.charcode-48}`).
		document.getElementById("display").value += e.key;
		console.log("DIGIT");
	}
	console.log(e);
}*/

document.onkeydown = function (e)
{
	console.log(e.key);
	let button = document.getElementById(`${e.key}`);
	if (button != null) button.classList.add("button-active");

	console.log(button);

	switch (e.key)
	{
		case "Escape":
			document.getElementById("C").classList.add("button-active");
			break;
		case "Enter":
			document.getElementById("=").classList.add("button-active");
			break;
	}
}
document.onkeyup = function (e)
{
	let button = document.getElementById(`${e.key}`);
	if (button != null && button.classList != null)
		button.classList.remove("button-active");

	switch (e.key)
	{
		case "Escape":
			document.getElementById("C").classList.remove("button-active");
			document.getElementById("display").value = "0";
			break;
		case "Enter":
			document.getElementById("=").classList.add("button-active");
			break;
	}
	if (e.key >= 0 && e.key <= 9 || e.key == '.')
		digit2display(e.key);
	if (e.key == "Backspace")
	{

	}
}