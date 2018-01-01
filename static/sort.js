function sortIt() {
	var arrStr = document.getElementById('array').value;
	var arr = arrStr.split(',').map(Number);
	var algo = parseInt(document.getElementById('algorithm').value);
	switch(algo) {
		case 0:
			bubbleSort(arr);
			break;
		case 1:
			selectionSort(arr);
			break;
		case 2:
			insertionSort(arr);
			break;
		case 3:
			mergeSort(arr);
			break;
		case 4:
			quickSort(arr, 0);
			break;
		case 5:
			quickSort(arr, 1);
			break;
	}
}

function generateArray(size, max) {
	// function to make array of `size` random values < `max`
	var arr = [];
	for(var i = 0; i < size; i++)
		arr.push(Math.floor(Math.random() * max));
	document.getElementById('array').value = arr.toString();
}

/*
function bubbleSort(arr, timeInterval) {
	var i = 0;
	var j = 0;
	var length = arr.length;
	var chart = makeChart(arr);
	var dataArr = chart.data.datasets[0].data;
	var colorArr = chart.data.datasets[0].backgroundColor;
	
	(function nextIteration() {
		for(var k = 0; k < length; k++) {
			colorArr[k] = "black";
		}
		if (j >= length - i - 1) {
			j = 0;
			i++;
		}
		if (i < length) {
			if (dataArr[j] > dataArr[j+1]) {
				colorArr[j] = "green";
				colorArr[j+1] = "green"
				var temp = dataArr[j];
				dataArr[j] = dataArr[j+1];
				dataArr[j+1] = temp;
			}
			else {
				colorArr[j] = "yellow";
				colorArr[j+1] = "yellow";
			}
			j++;
			setTimeout(nextIteration, timeInterval);
		}
		chart.update();
	})();
}
*/

function bubbleSort(arr) {
	var results = [];
	var swapped;
	do {
		swapped = false;
		for (var i=1; i < arr.length; i++) {
			if (arr[i-1] > arr[i]) {
				var temp = arr[i-1];
				arr[i-1] = arr[i];
				arr[i] = temp;
				swapped = true;
			}
			results.push(arr.slice());
		}
	} while (swapped);
	showResults(results);
}

/*
function selectionSort(arr, timeInterval) {
	var i = 0;
	var j = 1;
	var minIndex = i;
	var length = arr.length;
	var chart = makeChart(arr);
	var dataArr = chart.data.datasets[0].data;
	var colorArr = chart.data.datasets[0].backgroundColor;
	
	(function nextIteration() {
		for(var k = 0; k < length; k++) {
			colorArr[k] = "black";
		}
		if(j >= length) {
			var temp = dataArr[minIndex];
			dataArr[minIndex] = dataArr[i];
			dataArr[i] = temp;
			minIndex = ++i;
			j = i + 1;
		}
		if (i < length) {
			colorArr[j] = "yellow";
			minIndex = dataArr[j] < dataArr[minIndex] ? j : minIndex;
			colorArr[minIndex] = "green";
			colorArr[i] = "green";
			j++;
			setTimeout(nextIteration, timeInterval);
		}
		chart.update();
	})();
}
*/

function selectionSort(arr) {
	var results = [];
	for(var i=0; i<arr.length-1; i++) {
		var minIndex = i;
		for(var j=i+1; j < arr.length; j++) {
			minIndex = arr[minIndex] < arr[j] ? minIndex : j;
			results.push(arr.slice());
		}
		var temp = arr[minIndex];
		arr[minIndex] = arr[i];
		arr[i] = temp;
		results.push(arr.slice());
	}
	showResults(results);
}

function insertionSort(arr) {
	var results = [];
	results.push(arr.slice());
	var n = arr.length;
	for(var i = 1; i < n; i++) {
		var j;
		for(j = i-1; arr[j] > arr[i] && j >= 0; j--)
			results.push(arr.slice());
		var temp = arr[i];
		var index = j+1;
		for(j = i; j > index; j--) {
			arr[j] = arr[j-1];
			results.push(arr.slice());
		}
		arr[index] = temp;
		results.push(arr.slice());
	}
	showResults(results);
}

function mergeSort(arr) {
	// NOTE: this is an iterative implementation as opposed to a recursive one
	var results = [];
	results.push(arr.slice());
	var currentSize;
	var left;
	var n = arr.length;
	for (currentSize = 1; currentSize < n; currentSize *= 2) {
		for (left = 0; left < n-1; left += 2*currentSize) {
			var mid = left + currentSize - 1;
			var right = Math.min(left + 2*currentSize - 1, n-1);
			merge(arr, left, mid, right, results);
		}
	}
	showResults(results);
}

function merge(arr, leftIndex, midIndex, rightIndex, results) {
	// merge subroutine for `mergSort`
	var i, j, k;
	var leftSize = midIndex - leftIndex + 1;
	var rightSize =  rightIndex - midIndex;

	var leftArr = [];
	var rightArr = [];
	for (i = 0; i < leftSize; i++)
		leftArr.push(arr[leftIndex + i]);
	for (j = 0; j < rightSize; j++)
		rightArr.push(arr[midIndex + 1+ j]);
	
	i = 0;
	j = 0;
	k = leftIndex;
	while (i < leftSize && j < rightSize) {
		if (leftArr[i] <= rightArr[j]) {
			arr[k] = leftArr[i];
			i++;
		}
		else {
			arr[k] = rightArr[j];
			j++;
		}
		k++;
		results.push(arr.slice());
	}

	while (i < leftSize) {
		arr[k] = leftArr[i];
		i++;
		k++;
		results.push(arr.slice());
	}

	while (j < rightSize) {
		arr[k] = rightArr[j];
		j++;
		k++;
		results.push(arr.slice());
	}
}

function quickSort(arr, partitionType) {
	results = [arr.slice()];
	quickSortRecurse(arr, 0, arr.length-1, results, partitionType);
	showResults(results);
}

function quickSortRecurse(arr, left, right, results, partitionType) {
	// helper function for `quickSort`
	if (right > left) {
		var oldPivotIndex;
		switch(partitionType) {
			case 0:
				oldPivotIndex = left + Math.floor( Math.random()*(right+1-left) );
				break;
			case 1:
				oldPivotIndex = medianOfThree(arr, left, right);
				break;
		}
		var newPivotIndex = partition(arr, left, right, oldPivotIndex, results);
		quickSortRecurse(arr, left, newPivotIndex - 1, results, partitionType);
		quickSortRecurse(arr, newPivotIndex + 1, right, results, partitionType);
	}
}

function medianOfThree(arr, left, right) {
	// return index of median of `arr[left]`, `arr[right]` and middle value
	mid = Math.floor((left + right)/2);
	temp = [arr[left], arr[mid], arr[right]];
	temp.sort();
	if(temp[1] == arr[left])
		return left;
	else if(temp[1] == arr[mid])
		return mid;
	else
		return right;
}

function partition(arr, left, right, pivotIndex, results) {
	// partition subroutine for quicksort
	var temp = arr[left];
	arr[left] = arr[pivotIndex];
	arr[pivotIndex] = temp;
	results.push(arr.slice());
	var newIndex = left;
	for(var j = left+1; j < right+1; j++) {
		if (arr[j] < arr[left]) {
			temp = arr[j];
			arr[j] = arr[newIndex+1];
			arr[newIndex+1] = temp;
			newIndex++;
		}
		results.push(arr.slice());
	}
	temp = arr[left];
	arr[left] = arr[newIndex];
	arr[newIndex] = temp;
	results.push(arr.slice());
	return newIndex;
}

function showResults(results) {
	// given an array of arrays(the different states the original array to be sorted goes through in a particular algorithm),
	// draw a chart and show them with a time interval in between each one
	var timeInterval = parseInt(document.getElementById('time interval').value);
	var loaderTimeWrapper = document.getElementById('loader_time wrapper');
	loaderTimeWrapper.innerHTML = '<div class="loader"></div>';
	var chart = makeChart(results[0]);
	var arr = chart.data.datasets[0].data;
	var colorArr = chart.data.datasets[0].backgroundColor;
	var i = 1;
	var timeTaken = 0;
	(function nextIteration() {
		for(var j = 0; j < colorArr.length; j++) {
			colorArr[j] = 'black';
		}
		if(i < results.length) {
			for(var j = 0; j < arr.length; j++) {
				arr[j] = results[i][j];
				if(results[i][j] != results[i-1][j])
					colorArr[j] = 'yellow';
			}
			i++;
			timeTaken += timeInterval;
			setTimeout(nextIteration, timeInterval);
		}
		else
			loaderTimeWrapper.innerHTML = '<div class=monospace>time taken: ' + timeTaken + ' ms</div>';
		chart.update();
	})();
}

function makeChart(arr) {
	// draws bar chart depicting `arr` and returns object reference to the chart
	var canvasWrapper = document.getElementById('canvas wrapper');
	canvasWrapper.innerHTML = '<canvas id="canvas"></canvas>';
	var labelArr = [];
	var colorArr = [];
	for(var i = 0; i < arr.length; i++) {
		labelArr.push('[' + i + ']');
		colorArr.push('black');
	}
	var chart = new Chart(document.getElementById('canvas'), {
		type: 'bar',
		data: {
			labels: labelArr,
			datasets: [
				{
					label: 'value',
					backgroundColor: colorArr,
					data: arr
				}
			]
		},
		options: {
			legend: {
				display: false
			},
			title: {
				display: false,
				text: 'graphical representation of array'
			},
			scales: {
				yAxes: [{
					ticks: {
						min: Math.min.apply(null, arr) - 1,
						max: Math.max.apply(null, arr)    
					}
				}]
			}
		}
	});
	return chart;
}