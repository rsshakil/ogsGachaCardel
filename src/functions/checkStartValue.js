/*
	startValueが同じだとcountUpが動作しないため、毎回これを入れて変化を加える
*/
function checkStartValue(startValue, endValue, pointStateValue) {
	if (startValue == endValue) {
		return startValue;
	}
	else {
		if (pointStateValue.start == startValue) return (Math.random() > 0.5)?((startValue - 1) < 0)?startValue + 1:startValue - 1:startValue + 1;
		else return startValue;
	}
}
export default checkStartValue;