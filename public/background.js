// background.js

// 웨일 브라우저 API를 사용하여 익스텐션의 기능을 구현합니다.
// 예: 사이드바를 열 때 메시지를 출력합니다.
whale.sidebarAction.onClicked.addListener(() => {
    console.log('Sidebar opened');
  });
  
  // 웨일 브라우저 API를 사용하여 탭, 알림, 스토리지 등을 관리합니다.
  // 예: 새 탭을 열 때 메시지를 출력합니다.
  whale.tabs.onCreated.addListener((tab) => {
    console.log('New tab opened: ' + tab.id);
  });
  
  chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
  });
  