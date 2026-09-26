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

document.getElementById("btn-start").addEventListener("click", startCountdownTime)
function startCountdownTime()
{
	let targetDateControl = document.getElementById("target-date");
	let targetTimeControl = document.getElementById("target-time");
	let btnStart = document.getElementById("btn-start");
	if (btnStart.value === "Start")
	{
		btnStart.value = "Stop";
		targetDateControl.disabled = targetTimeControl.disabled = true;
		tickCountdown()
	}
	else
	{
		btnStart.value = "Start";
		targetDateControl.disabled = targetTimeControl.disabled = false;
	}
}
function tickCountdown()
{
	let now = new Date();
	let targetDate = document.getElementById("target-date").valueAsDate;
	let targetTime = document.getElementById("target-time").valueAsDate;

	//¬ыравниваем часовой по€с
	targetDate.setHours(targetDate.getHours() + targetDate.getTimezoneOffset() / 60)
	targetTime.setHours(targetTime.getHours() + targetTime.getTimezoneOffset() / 60)

	//—водим целевые дату и врем€ в одну переменную
	targetTime.setFullYear(targetDate.getFullYear());
	targetTime.setMonth(targetDate.getMonth());
	targetTime.setDate(targetDate.getDate());

	//ќпредел€ем разницу во времени
	let timestamp = targetTime - now;
	let duration = Math.trunc(timestamp / 1000);

	document.getElementById("target-date-value").innerHTML = targetDate;
	document.getElementById("target-time-value").innerHTML = targetTime;
	document.getElementById("timestamp").innerHTML = timestamp;
	document.getElementById("duration").innerHTML = duration;

	const SECONDS_PER_MINUTE = 60;
	const SECONDS_PER_HOUR = 3600;
	const SECONDS_PER_DAY = 86400;
	const SECONDS_PER_WEEK = 604800;
	const DAYS_PER_MONTH = 365.25 / 12;
	const SECONDS_PER_MONTH = DAYS_PER_MONTH * SECONDS_PER_DAY;
	const SECONDS_PER_YEAR = SECONDS_PER_DAY * 365 + SECONDS_PER_HOUR * 6;

	//—нова раздел€ем дату и врем€ дл€ удобства вычислени€
	let time_of_day = duration % SECONDS_PER_DAY;
	let date = duration - time_of_day;

	document.getElementById("hours-unit").innerHTML = addLeadingZero(Math.trunc(time_of_day / SECONDS_PER_HOUR));
	time_of_day = time_of_day % SECONDS_PER_HOUR;
	document.getElementById("minutes-unit").innerHTML = addLeadingZero(Math.trunc(time_of_day / SECONDS_PER_MINUTE));
	document.getElementById("seconds-unit").innerHTML = addLeadingZero(time_of_day % SECONDS_PER_MINUTE);

	setTimeout(tickCountdown, 100);
}