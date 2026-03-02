// Style constants for Workday Autofill
// This file is loaded before content.js and shares the same scope

const STYLES = {
  // Highlight styles for auto-filled fields
  field: {
    backgroundColor: "#e8f0fe",
    boxShadow: "0 0 4px 1px #1a73e8, 0 0 12px 4px rgba(26, 115, 232, 0.4)",
  },

  // Floating modal CSS — injected as a <style> tag
  //the "/*CSS*/" comment here helps with the syntax highlighting
  //via the es6-string-html vscode extension

  modalCSS: /*CSS*/ `
    #workday-autofill-modal {
      position: fixed;
      top: 100px;
      right: 20px;
      width: 280px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.15);
      font-family: system-ui, -apple-system, sans-serif;
      z-index: 999999;
      overflow: hidden;
    }
    #workday-autofill-modal .waf-header {
      background: #1a73e8;
      color: white;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      user-select: none;
    }
    #workday-autofill-modal .waf-logo {
      width: 24px;
      height: 24px;
      object-fit: contain;
      flex-shrink: 0;
    }
    #workday-autofill-modal .waf-header-title {
      font-size: 16px;
      font-weight: 600;
      flex: 1;
      margin: 0;
    }
    #workday-autofill-modal .waf-close {
      background: none;
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
      padding: 0 2px;
      line-height: 1;
      opacity: 0.8;
    }
    #workday-autofill-modal .waf-close:hover { opacity: 1; }
    #workday-autofill-modal .waf-body {
      padding: 20px 16px;
    }
    #workday-autofill-modal .waf-headline {
      font-size: 15px;
      font-weight: 600;
      color: #202124;
      margin: 0 0 8px;
    }
    #workday-autofill-modal .waf-sub {
      font-size: 13px;
      color: #5f6368;
      margin: 0 0 20px;
      line-height: 1.5;
    }
    #workday-autofill-modal .waf-confirm-btn {
      width: 100%;
      padding: 10px;
      background: #1a73e8;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      margin-bottom: 8px;
      box-sizing: border-box;
    }
    #workday-autofill-modal .waf-confirm-btn:hover { background: #1557b0; }
    #workday-autofill-modal .waf-cancel-btn {
      width: 100%;
      padding: 10px;
      background: transparent;
      color: #5f6368;
      border: 1px solid #dadce0;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      box-sizing: border-box;
    }
    #workday-autofill-modal .waf-cancel-btn:hover { background: #f8f9fa; }
  `,
};
