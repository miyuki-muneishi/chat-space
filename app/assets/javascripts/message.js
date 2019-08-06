$(function() {
  function buildHTML(message) {
    var image = message.image ? `<img src= ${message.image}>` : "";
    var html = `<div class="chat_message">
                  <div class="chat_message__header">
                    <p class="chat_message__header__name">
                      ${message.user_name}
                    </p>
                    <p class="chat_message__header__date">
                    ${message.date}
                    </p>
                  </div>
                  <div class="chat_message__text">
                    <p>
                      ${message.body}
                    </p>
                    ${image}
                  </div>
                </div>`;
    return html;
  }

  function scrollBottom(target) {
    var scrollHeight = $(target)[0].scrollHeight;
    $(target).animate({ scrollTop: scrollHeight }, 1000);
  }

  function clearForm() {
    $("#message_body").val(""); // 入力欄を空にする
    $('input[type="file"]').val(null); // 選択中の画像を削除する
  }

  $("#new_message").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action"); // リクエスト送信先のURLを取得

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
      .done(function(data) {
        var html = buildHTML(data);
        var target = ".chat_messages";
        $(target).append(html);
        scrollBottom(target);
        clearForm();
      })
      .fail(function(data) {
        alert("メッセージを入力してください。");
      })
      .always(function(data) {
        $(".chat_form__message__button").prop("disabled", false); // ボタンを押下可能にする
      });
  });
});
