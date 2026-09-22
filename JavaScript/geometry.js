// JavaScript source code
function figura()
{
	let n = Number(document.getElementById('numberEnd').value);

	let f = '\n';
	let starsInRow = 1;
	let currentString = 1;

	for (let i = 1; i <= n; i++)
	{
		f += '* ';
		currentString++;
		if (currentString == starsInRow)
		{
			f += '\n';
			starsInRow++;
			currentString = 0;
		}
	}
	document.getElementById('result').innerHTML = `${f}`;
}