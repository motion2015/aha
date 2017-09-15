$(function(){
	rollBanner();
})
function rollBanner(){
	var $base = $('.list-banner'),
		$li = $base.find(' > li'),
		_size = $li.length,
		_old = 0,
		_cur = 0,
		_interval = '',
		_auto = null,
		_temp = false,
		_time = 5000, // 타이머 시간 간격
		_arr = [400,800,1100,1300]; // 라인 그리는 시간
	setBanner(); // 배너 좌우 롤링
	setTime(); // 타임 이벤트 시작

	// 배너 롤링
	function setBanner(){
		$li.eq(_cur).css({ 'display' : 'block' });
		$base.animate({ 'left' : '-100%'},300,function(){
			setItem(_cur); // 아아템 이벤트 실행
			$li.eq(_old).removeClass('on'); // 아이템 실행한 이벤트 제거
			$li.eq(_cur).removeAttr('style').addClass('on');
			$li.eq(_old).find('.item').removeClass('on');
			$base.css({ 'left' : '0' });
			_old = _cur;
			_cur = (_cur + 1) % _size;
		})
	}
	// 아이템 이벤트 실행
	function setItem(idx){
		var $item = $li.eq(idx).find('.item'),
			_itemSize = $item.length;
		for (var i = 0; i < _itemSize; i++){
			var _delay = 200 + (i * 200);
			if (idx == 2) _delay = _arr[i]; // 3번째 배너 라인 그리기 딜레이 시간
			// 시간 순으로 on 클래스 추가해서 css에서 정의한 animation 적용
			$item.eq(i).delay(_delay).queue(function(next){
				$(this).addClass('on');
				next();
			});
		};
	}
	function setTime(){
		_auto = function(){
			clearInterval(_interval);
			setBanner();
			_interval = setInterval(_auto,_time)
		}
		_interval = setInterval(_auto, _time)
	};
}