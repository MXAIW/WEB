// JavaScript source code
function figura()
{
	let n = Number(document.getElementById('numberEnd').value);
	let type = Number(document.getElementById('type').value);

	let f = '';
	let starsInRow = 1;
	let currentString = 0;

	if (type === 1 && n != 0)
	{
		starsInRow = 5;
		for (let i = 0; i <= n; i++)
		{
			f += '* ';
			currentString++;
			if (currentString == starsInRow)
			{
				f += '<br>';
				currentString = 0;
			}
		}
		document.getElementById('result').innerHTML = `${f}`;
	}
	if (type === 2 && n != 0)
	{
		let starsInRow = 2;
		for (let i = 1; i <= n; i++)
		{
			f += '* ';
			currentString++;
			if (currentString == starsInRow)
			{
				f += '<br>';
				starsInRow++;
				currentString = 0;
			}
		}
		document.getElementById('result').innerHTML = `${f}`;
	}
}