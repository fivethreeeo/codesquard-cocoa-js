'use-strict';

function quickSort(arr, start = 0, end = arr.length - 1) {
  //index 설정
  let pivotIndex = end;
  let leftIndex = start;
  let rightIndex = end - 1;

  // 넘어온 left값을 pivot값으로
  pivotIndex = dodo(arr, leftIndex, rightIndex, pivotIndex);

  // 재귀 -> 배열의 길이가 1이 될 때까지
  if (leftIndex < pivotIndex - 1) {
    quickSort(arr, leftIndex, pivotIndex - 1);
  }
  if (pivotIndex + 1 < rightIndex + 1) {
    quickSort(arr, pivotIndex + 1, rightIndex + 1);
  }

  return arr;
}

function dodo(arr, left, right, pivot) {
  while (left <= right) {
    // left -> pivot 보다 큰 값 찾기
    // right -> pivot 보다 작은 값 찾기
    while (arr[left] < arr[pivot]) left++;
    while (arr[right] > arr[pivot]) right--;

    if (left <= right) {
      // left, right 스왑
      let temp_left = arr[left];
      arr[left] = arr[right];
      arr[right] = temp_left;

      // 다음에 찾을 left, right로 이동
      left++;
      right--;
    }
  }

  // left, pivot 스왑
  let temp_left = arr[left];
  arr[left] = arr[pivot];
  arr[pivot] = temp_left;

  return left;
}

console.log(quickSort([4, 1, 7, 6, 3, 8, 2, 5, 10, 20, 16, 40, 25, 6, 90]));
// [1, 2, 3, 4, 5, 6, 6, 7, 8, 10, 16, 20, 25, 40, 90]
