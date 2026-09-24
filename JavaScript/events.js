// JavaScript source code
function factorial()
{
	let n = Number(document.getElementById("factorial-source").value);
	alert(`${typeof (n)} ${n}`);
	let f = BigInt(1);
	for (let i = 1n; i <= n; i++)
	{
		f *= i;
	}
	document.getElementById("factorial-result").innerHTML = `${n}! = ${f}`;
}
function power()
{
	let base = document.getElementById('base').value;
	let exp = document.getElementById('exponent').value;
	document.getElementById('power').innerHTML = `${base}<sup>${exp}</sup>=${base**exp}`;
}
function fibonacci()
{
	let n = Number(document.getElementById("fibonacci-end").value);
	let numberA = 0n;
	let numberB = 1n;
	let numberNext = 0n;
	let f = '';
	document.getElementById("fibonacci-result").innerHTML = `${n}: `;
	for (let i = 1n; i <= n; i++)
	{
		f += numberA + ' ';
		numberNext = numberA + numberB
		numberA = numberB;
		numberB = numberNext;
	}
	document.getElementById("fibonacci-result").innerHTML = `${f} `;

}
//////////////////////////
function setImage()
{
	let image_file_control = document.getElementById("image-file");
	let filename = image_file_control.files[0];
	document.getElementById("image").src = URL.createObjectURL(filename);
}
function setBackgroundColor()
{
	document.body.style.backgroundColor = document.getElementById("background-color").value;
}
function setForegroundColor(e)
{
	//document.body.style.color = document.getElementById("foreground-color").value;
	document.body.style.color = e.target.value
}
function setColor(e)
{
	document.body.style[e.target.id === 'background-color' ? 'color' : 'foreground-color'] = e.target.color;
}
document.addEventListener("mousemove", trackMouse)
function trackMouse(e)
{
	document.getElementById("mouse-coords").innerHTML = `Mouse: X = ${e.clientX}, Y = ${e.clientY}`;
}
document.getElementById("switch-background").addEventListener("click", switchBackground)
function switchBackground(e)
{
	document.body.className = document.body.className === `dark` ? `ligth` : `dark`;
}
document.getElementById("switch-background-delay").addEventListener("change", setDelay)
function setDelay(e)
{
	let delay = e.target.value;
	document.body.style.transition = document.getElementById("switch-background").transition = `color ${delay}s, background-color ${delay}s, background-image ${delay}s`;
}

////////////////////////////////////
function addLeadingZero(number)
{
	return number < 10 ? `0${number}` : `${number}`;
}

tick_timer();
function tick_timer()
{
	let time = new Date();
	document.getElementById("full-time").innerHTML = time.toString();

	document.getElementById("hours").innerHTML = addLeadingZero(time.getHours());
	document.getElementById("minutes").innerHTML = addLeadingZero(time.getMinutes());
	document.getElementById("seconds").innerHTML = addLeadingZero(time.getSeconds());

	document.getElementById("years").innerHTML = addLeadingZero(time.getFullYear());
	document.getElementById("months").innerHTML = addLeadingZero(time.getMonth() + 1);
	document.getElementById("days").innerHTML = addLeadingZero(time.getDate());

	document.getElementById("weekday").innerHTML = time.toLocaleDateString("ru", { weekday: 'long' });

	document.getElementById("current-date").style.visibility = document.getElementById("show-date").checked ? "visible" : "hidden";
	document.getElementById("weekday").style.visibility = document.getElementById("show-weekday").checked ? "visible" : "hidden";


	setTimeout(tick_timer, 100);
}