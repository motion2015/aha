$( document ).ready(function() {
/* Start 서브 페이지 홈 버튼 위치설정   */
    /* Start 서브 페이지 홈 버튼 위치설정
    var responHeight = $( window ).height()-140;
$('.header').css('height', responHeight );
$('.home').css('margin-top',responHeight/2-$('.home').height()/2);*/
/* End 서브 페이지 홈 버튼 위치설정   */

/* Start 서브 페이지 홈 버튼 위치설정   */
$('.header').css('height',$(".main_content").height()+60);
//$('.home').css('margin-top',$(".main_content").height()/2-$('.home').height()/2+60);
$('.page_info').css('height',$('.header').height());/*서브 페이지 left*/
/* End 서브 페이지 홈 버튼 위치설정   */
maxHeight();
$(window).on("resize", maxHeight);
function maxHeight(){
      var _maxHeight=$(".main_content .tap_group").eq(0).height();
      function resizeWin(){
        // console.log($( window ).height());
      //    ($( window ).height()<840 )? $('.footer').css('position','static'): $('.footer').css('position','absolute');

          /* Start 서브 페이지 홈 버튼 위치설정   */
      $('.header').css('height',$(".main_content").height()+60);
    //  $('.home').css('margin-top',$(".main_content").height()/2-$('.home').height()/2+60);
      /* End 서브 페이지 홈 버튼 위치설정   */


      console.log($(".main_content .tap_group").eq(0).height());
        $(".main_content .tap_group").each(function () {

            ($(this).height()!==0)? targetHight=$(this).height(): null;
            console.log("targetHight===="+targetHight);

            if(targetHight >_maxHeight){
              //_maxHeight = targetHight;

              console.log("크다");
            }
            else{
              console.log("작다");
            }


              });


      }



  return resizeWin;
  console.log(" _maxHeight===="+_maxHeight);

}

/* tooltip */
$('.link_tooltip').click(function() {
  $(this).siblings('.tooltip').show();
});

$('.close').click(function() {
  $(this).parents('.tooltip').hide();
});

/*  modal layer */
$(".modali").on('click', function(e) {
  $( ".modal-layer" ).empty();
  e.preventDefault();

  var url=$(this).data('urli');
  $.get( url, function( data ) {
    $( ".modal-layer" ).html( data );

    });
    $('.modal-layer').dialog();
});
/*로그인로그아웃  */
$(".topheader .login").on('click', function(e) {
  $(this).toggleClass("on");
});
/*  layer popup */
$(".layerpopup").on('click', function(e) {
  e.preventDefault();
  console.log(334);
    var url=$(this).data('popuprul');
    $(this).parents('.tooltip').hide();
    layer_open(url);
});

function layer_open(url){

		var temp = $('#layer2');
		var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수
    $.get( url, function( data ) {
      $( ".pop-conts" ).html( data );
      });

		if(bg){
			$('.layer').fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다.
		}else{
			temp.fadeIn();
		}

		// 화면의 중앙에 레이어를 띄운다.
		if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
		else temp.css('top', '0px');
		if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
		else temp.css('left', '0px');

		temp.find('a.cloasebtn').click(function(e){
			if(bg){
				$('.layer').fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
			}else{
				temp.fadeOut();
			}
			e.preventDefault();
		});

		$('.layer .bg').click(function(e){	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
			$('.layer').fadeOut();
			e.preventDefault();
		});

	}
/* 탭메뉴  */
$('.tap_group > h3 > a').click(function(e) {
  $('.tap_group').removeClass("on");
  $('.tap_group > div').hide();
  $('.tap_group > h3 > div').hide();
  $('.tap_group .current').removeClass("current");
  $(this).parent().siblings('div').show();
  $(this).parent().siblings('a').show();
  $(this).parent().parent().addClass('current');
  $(this).parent().addClass('current');
  maxHeight();
  e.preventDefault();
}).eq(0).addClass('current');

$('.register_group > h3 > a').click(function(e) {
  $('.register_group').removeClass("on");
  $('.register_group > div').hide();
  $('.register_group > h3 > div').hide();
  $('.register_group .current').removeClass("current");
  $(this).parent().siblings('div').show();
  $(this).parent().siblings('a').show();
  $(this).parent().parent().addClass('current');
  $(this).parent().addClass('current');
  maxHeight();
  e.preventDefault();
}).eq(0).addClass('current');

/* input select UL로 표현 :: jquery UI로 대체함. 삭제할것  */
$("ul").on("click", ".init", function() {
    $(this).closest("ul.selectUl").children('li:not(.init)').slideDown();
});

var allOptions = $("ul.selectUl").children('li:not(.init)');


	$("ul.selectUl").on("click", "li:not(.init)", function() {
		allOptions.removeClass('selected');
		$(this).addClass('selected');
		$(this).parent().children('.init').html($(this).html());
		allOptions.slideUp();
	});

  /* //input select UL로 표현 :: jquery UI로 대체함. 삭제할것  */

      (function(){ // 외부 라이브러리와 충돌을 막고자 모듈화.
          // 브라우저 및 버전을 구하기 위한 변수들.
          'use strict';
          var agent = navigator.userAgent.toLowerCase(),
              name = navigator.appName,
              browser;

          // MS 계열 브라우저를 구분하기 위함.
          if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
              browser = 'ie';
              if(name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
                  agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
                  browser += parseInt(agent[1]);
                  $('.selectUl').children('li:not(.init)').slideUp();// IE old version (IE 8) selectUL
              } else { // IE 11+
                  if(agent.indexOf('trident') > -1) { // IE 11
                      browser += 11;
                  } else if(agent.indexOf('edge/') > -1) { // Edge
                      browser = 'edge';
                  }
              }
          } else if(agent.indexOf('safari') > -1) { // Chrome or Safari
              if(agent.indexOf('opr') > -1) { // Opera
                  browser = 'opera';
              } else if(agent.indexOf('chrome') > -1) { // Chrome
                  browser = 'chrome';
              } else { // Safari
                  browser = 'safari';
              }
          } else if(agent.indexOf('firefox') > -1) { // Firefox
              browser = 'firefox';
          }

          // IE: ie7~ie11, Edge: edge, Chrome: chrome, Firefox: firefox, Safari: safari, Opera: opera
          document.getElementsByTagName('html')[0].className = browser;
      }());
});
