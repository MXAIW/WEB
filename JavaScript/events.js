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
	document.getElementById('power').innerHTML = `${base}<sup>${exp}</sup>=${base ** exp}`;
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

const DAYS_PER_MONTH = 365.25 / 12;
const SECONDS_AMOUNT_IN =
{
	MINUTE: 60,
	HOUR: 3600,
	DAY: 86400,
	WEEK: 604800,
	MONTH: DAYS_PER_MONTH * 86400,
	YEAR: 86400 * 365 + 3600 * 6
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
		resetDisplay();
		tickCountdown();
	}
	else
	{
		btnStart.value = "Start";
		targetDateControl.disabled = targetTimeControl.disabled = false;
	}
}
function tickCountdown()
{
	if (document.getElementById("btn-start").value === "Start") return;
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
	let timestamp = Math.abs(targetTime - now);
	let duration = Math.trunc(timestamp / 1000);

	document.getElementById("target-date-value").innerHTML = targetDate;
	document.getElementById("target-time-value").innerHTML = targetTime;
	document.getElementById("timestamp").innerHTML = timestamp;
	document.getElementById("duration").innerHTML = duration;

	//—нова раздел€ем дату и врем€ дл€ удобства вычислени€
	let time_of_day = duration % SECONDS_AMOUNT_IN.DAY;
	let date = duration - time_of_day;

	//console.log(SECONDS_AMOUNT_IN["week".toUpperCase()]);
	handleTimeBlock(date, "year");

	/*
	let months = Math.trunc(date / SECONDS_AMOUNT_IN.MONTH);
	if (months > 0)
	{
		date = date % SECONDS_AMOUNT_IN.MONTH;
		let months_unit = document.getElementById("months-unit");
		if (months_unit == null)
		{
			let months_block = createTimeBlock("months", months);
			hours_block.before(months_block);
		}
		else
			months_unit.innerHTML = addLeadingZero(months);
	}
	else removeTimeBlock("months");*/
	date = handleTimeBlock(date, "months")

	/*let weeks = Math.trunc(date / SECONDS_AMOUNT_IN.WEEK);
	if (weeks > 0)
	{
		date = date % SECONDS_AMOUNT_IN.WEEK;
		let weeks_unit = document.getElementById("weeks-unit");
		if (weeks_unit == null)
			hours_block.before(createTimeBlock("weeks", weeks));
		else
			weeks_unit.innerHTML = addLeadingZero(weeks);
	}
	else removeTimeBlock("weeks");*/
	date = handleTimeBlock(date, "weeks")

	/*let days = Math.trunc(date / SECONDS_AMOUNT_IN.DAY);
	if (days > 0)
	{
		date = date % SECONDS_AMOUNT_IN.DAY;
		let days_unit = document.getElementById("days-unit");
		if (days_unit == null)
			hours_block.before(createTimeBlock("days", days));
		else days_unit.innerHTML = addLeadingZero(days);
	}
	else removeTimeBlock("days");
	*/
	date = handleTimeBlock(date, "days")

	//Time of day calcuation
	document.getElementById("hours-unit").innerHTML = addLeadingZero(Math.trunc(time_of_day / SECONDS_AMOUNT_IN.HOUR));
	time_of_day = time_of_day % SECONDS_AMOUNT_IN.HOUR;
	document.getElementById("minutes-unit").innerHTML = addLeadingZero(Math.trunc(time_of_day / SECONDS_AMOUNT_IN.MINUTE));
	document.getElementById("seconds-unit").innerHTML = addLeadingZero(time_of_day % SECONDS_AMOUNT_IN.MINUTE);

	if (duration === 0)
	{
		let player = document.getElementById("player");
		player.play();
	}

	setTimeout(tickCountdown, 100);
}
function createTimeBlock(name, value)
{
	let time_block = document.createElement("div");
	time_block.className = "time-block";

	let unit = document.createElement("div");
	unit.id = `${name}-unit`;
	unit.className = "time-unit";
	unit.innerHTML = name.charAt(0).toUpperCase() + name.slice(1);

	let marker = document.createElement("div");
	marker.id = `${name}-marker`;
	marker.className = "time-marker";
	marker.innerHTML = name;

	time_block.prepend(unit);
	time_block.append(marker);
	return time_block;
}
function removeTimeBlock(name)
{
	let unit = document.getElementById(`${name}-unit`);
	if (unit != null)
	{
		let block = unit.parentElement;
		let display = block.parentElement;
		display.removeChild(block);
	}
}

function resetDisplay()
{
	let display = document.getElementById("display");
	let children = display.children;
	while (display.children[0].id != "hours-unit")
		display.children[0].children[0].remove();
}

function handleTimeBlock(date, name)
{
	name = name.substring(0, name.length - 1);
	let hours_block = document.getElementById("hours-unit").parentElement;
	let left = Math.trunc(date / SECONDS_AMOUNT_IN[name.toUpperCase()]);
	if (left > 0)
	{
		date = date % SECONDS_AMOUNT_IN.YEAR[name.toUpperCase()];
		let unit = document.getElementById(`${name}s-unit`);
		if (unit == null)
		{
			let block = createTimeBlock(`${name}s`, left);
			hours_block.before(block);
		}
		else
			unit.innerHTML = addLeadingZero(left);
	}
	else removeTimeBlock(`${name}s`);
	return date;
}