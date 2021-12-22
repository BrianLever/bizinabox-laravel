<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>LiveChat | Bizinabox</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <link rel="stylesheet" href="{{mix('assets/css/style.css')}}" />
    <link rel="stylesheet" href="{{asset('assets/css/livechat.css')}}" />
</head>
<body>
    <span class="close_btn">x</span>
    <div id="livechat" class="container position-relative h-100 p-0">
        <ul id="messages">

        </ul>
        <form id="biz-chat-form">
            <div class="biz-chat-bottom">
                <div class="biz-livechat-typing-text"></div>
                <a href="javascript:void(0);" class="biz-chat-file">
                    <i class="fas fa-plus-circle"></i>
                    <input type="file" id="livechat-file-upload" title="Add Files" class="input_element" disabled>
                </a>
                <textarea
                    name=""
                    id="m"
                    class="biz-livechat-text input_element"
                    autocomplete="off"
                    placeholder="Enter text here"
                    disabled
                ></textarea>

                <a href="javascript:void(0);" class="biz-chat-send input_element" id="submit_btn" disabled>
                    <i class="fa fa-paper-plane"></i>
                </a>
            </div>
        </form>
    </div>
</body>

<script src="{{mix('assets/js/script.js')}}"></script>
<script> var token = $('meta[name="csrf-token"]').attr('content'), socket_server = "{{option("socket_server", '')}}"; </script>
{{--<script src="{{asset('assets/js/chat.js')}}"></script>--}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.0/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.13/moment-timezone-with-data.js"></script>
<script src="{{asset('assets/vendors/autosize/autosize.min.js')}}"></script>
<script src="{{asset('assets/js/livechat.js')}}"></script>
</html>
