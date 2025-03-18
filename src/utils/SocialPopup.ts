// 팝업의 크기 지정
export const POPUP_WIDTH = 450;
export const POPUP_HEIGHT = 600;

// 현재 창의 위치
export const WINDOW_LEFT = window.screenLeft ?? window.screenX;
export const WINDOW_TOP = window.screenTop ?? window.screenY;

// 현재 창의 크기
export const WINDOW_WIDTH = window.outerWidth;
export const WINDOW_HEIGHT = window.outerHeight;

// 팝업을 띄울 좌표 (브라우저가 떠있는 화면 중앙)
export const POPUP_X = Math.round(WINDOW_LEFT + (WINDOW_WIDTH - POPUP_WIDTH) / 2);
export const POPUP_Y = Math.round(WINDOW_TOP + (WINDOW_HEIGHT - POPUP_HEIGHT) / 2);
