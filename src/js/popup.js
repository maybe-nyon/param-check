"use strict";

const func = () => {

  // パラメータチェックパターン
  const regexpParam01 = /(\?.*){2,}/,
    regexpParam02 = /\/\&{1}/,
    regexpParam03 = /\/\?{1}/,
    regexpParam04 = /\?{1}/,
    regexpParam05 = /\&{1}/,

  textForm = document.querySelector('input[type="text"]');

  // フォーカスが外れた時に全角を半角に変換する
  textForm.addEventListener('blur', () => {
    let textFormValue = textForm.value;
    textFormValue = textFormValue.replace(/[‐－―ー]/g, '-');
    const replacedValue = textFormValue.replace(/[Ａ-Ｚａ-ｚ０-９－！”＃＄％＆’（）＝＜＞，．？＿［］｛｝＠＾～￥]/g,
      (str) => {
        return String.fromCharCode(str.charCodeAt(0) - 0xFEE0)
      });
    textForm.value = replacedValue;
  }, false);

  // 「チェック」ボタンを押して入力欄を取得する
  const buttonClick = () => {
    const matchInput = document.getElementById('match'),
    matchValue = document.getElementById('match').value,
    validateMsgContainer = document.getElementById('js-validate-msg');
    const validate = (e) => {
        validateMsgContainer.innerHTML = e;
      },
      validateAlertClassRepeat = () => {
        matchInput.classList.add('alert--bg');
        matchInput.classList.remove('success--bg');
      };

    // 条件分岐
    // 入力欄が "空" の場合
    if (matchValue === "") {
      const validateMsg = `
        <span class="alert--text">URLを入力して下さい</span>`;
      validate(validateMsg);
      validateAlertClassRepeat();
    }

    // "?" が2つ以上含まれている場合 / "/&" 始まりの場合
    else if (regexpParam01.test(matchValue) || regexpParam02.test(matchValue)) {
      const validateMsg = `
        <span class="alert--text">不正なパラメータが含まれています</span>`;
      validate(validateMsg);
      validateAlertClassRepeat();
    }

    // "?" 始まりの場合
    else if (regexpParam03.test(matchValue) || regexpParam04.test(matchValue)) {
      const validateMsg = `
        <span class="success--text">正規のパラメータです</span>`;
      validate(validateMsg);
      matchInput.classList.remove('alert--bg');
    }

    // "&" 始まりの場合
    else if (regexpParam05.test(matchValue)) {
      const validateMsg = `
        <span class="alert--text">不正なパラメータが含まれています</span>`;
      validate(validateMsg);
      validateAlertClassRepeat();
    }

    // 上記以外
    else {
      const validateMsg = `
      <span class="alert--text">正しいURLを入力して下さい</span>`;
      validate(validateMsg);
      validateAlertClassRepeat();
    }
  }

  // 「チェック」ボタンを押した際の動作
  const button = document.getElementById('form__submit');
  button.addEventListener('click', buttonClick);
}
func();