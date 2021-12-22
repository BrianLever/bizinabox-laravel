<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>{{$template->name}} - Template | Bizinabox</title>

    <link rel="icon" href="{{asset('assets/img/favicon.ico')}}" />

    <meta name="keywords" content="HTML5 Template Crizal" />
    <meta name="description" content="Latest updates and statistic charts">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <link rel="stylesheet" href="{{mix('assets/css/style.css')}}" />
    <style>

        .handle_switch_area {
            display:inline-block;
            margin-left:20px;
        }
        .handle_switch_area a {
            color:#000;
            font-size:25px;
        }
        .handle_switch_area a.active {
            color:#33a506;
        }
        .view_switch_btn {
            margin-left:20px;
            text-decoration: none;
        }
        .view_switch_btn:hover {
            text-decoration: none;
        }
        .template_demo_area {
            width:100%;
            height: calc(100vh - 72px);
            justify-content: center;
            background-color:#f9fafa;
        }
        .parent_iframe_area {
            /*transition:all 0.5s ease-in-out;*/
        }
        .desktop_view_area {
            max-width:100%;
            overflow:hidden;
            border:none;
            width:100%;
            height:100%;
        }
        .mobile_view_area {
            width: 320px;
            height: 566px;
            position: relative;
            margin: auto;
            padding-top:50px;
        }
        .pad_view_area {
            width: 1106px;
            height: 753px;
            position: relative;
            margin: auto;
            padding-top:50px;
        }
        .preview_iframe {
            max-height: 100vh;
            max-width: 100vw;
            overflow: hidden;
            border: none;
        }
        .mobile_top_cover {
            content: "";
            display: inline-block;
            width: 100%;
            height: 62px;
            background: #fff;
            -webkit-box-shadow: -15px 8px 20px -10px rgba(0,0,0,.2);
            box-shadow: -15px 8px 20px -10px rgba(0,0,0,.2);
            border-radius: 46px 46px 0 0;
            position:relative;
        }
        .mobile_top_cover_line {
            width: 24px;
            height: 3px;
            border-radius: 1.5px;
            background-color: #eff1f2;
            position: absolute;
            top: 23px;
            left: 50%;
            -webkit-transform: translateX(-50%) translateY(-50%);
            transform: translateX(-50%) translateY(-50%);
        }
        .mobile_bottom_cover{
            border-radius: 0 0 46px 46px;
            margin-top: -8px;
            content: "";
            display: inline-block;
            width: 100%;
            height: 62px;
            background: #fff;
            -webkit-box-shadow: -15px 8px 20px -10px rgba(0,0,0,.2);
            box-shadow: -15px 8px 20px -10px rgba(0,0,0,.2);
        }
        .desktop_view_area .device_frame_area {
            display:none;
        }
        .mobile_view_area .device_frame_area {
            display:block;
        }
        .preview_iframe {
            box-shadow: -15px 8px 20px -10px rgba(0,0,0,.2);
            background-color: #f9fafa;
        }
        .pad_view_area .preview_iframe {
            margin-top:-10px;
        }
        nav.navbar {
             position: relative;
             top: 0px;
            left: 0;
            right: 0;
            border-bottom: 0;
            z-index: 998;
            background-color: #ffffff88;
        }

        ul{
            padding: 0;
            margin-top: 10px;
        }

        ul li{
            list-style: none;
            padding: 0;
            margin: 0;
        }
    </style>
</head>
<body style="overflow: hidden">
<div class="main-wrapper">
    <header>
        <div class="navbar-default">
            <!-- end top search -->
            <div class="container-fluid">
                <div class="row align-items-center">
                    <div class="col-12 col-lg-12">
                        <div class="menu_area alt-font">
                            <nav class="navbar navbar-expand-lg navbar-light no-padding">

                                <div class="navbar-header navbar-header-custom p-2 ml-lg-5 pl-lg-5 ">
                                    <!-- start logo -->
                                    <a href="/templates">❮ Back</a>
                                    <!-- end logo -->

                                    <div class="handle_switch_area">
                                        <a href="javascrpit:void(0);" data-hook="desktop_view" class="view_switch_btn active">
                                            <svg width="28" height="22" viewBox="0 0 28 22" xmlns="http://www.w3.org/2000/svg">
                                                <g fill="#000" fill-rule="evenodd">
                                                    <path d="M11 18h1v4h-1z"></path>
                                                    <path d="M9 21h10v1H9z"></path>
                                                    <path d="M16 18h1v4h-1z"></path>
                                                    <path d="M1 3v13c0 1.11.891 2 1.996 2h22.008A2.004 2.004 0 0 0 27 16V3c0-1.11-.891-2-1.996-2H2.996A2.004 2.004 0 0 0 1 3zM0 3c0-1.657 1.35-3 2.996-3h22.008A2.994 2.994 0 0 1 28 3v13c0 1.657-1.35 3-2.996 3H2.996A2.994 2.994 0 0 1 0 16V3z"></path>
                                                </g>
                                            </svg>
                                        </a>
                                        <a href="javascrpit:void(0);" data-hook="pad_view" class="view_switch_btn">
                                            <svg width="20" height="28" viewBox="0 0 20 28" xmlns="http://www.w3.org/2000/svg">
                                                <g fill="#000" fill-rule="evenodd">
                                                    <path d="M1 2.996v22.008C1 26.1 1.897 27 2.994 27h14.012c1.1 0 1.994-.895 1.994-1.996V2.996A2.001 2.001 0 0 0 17.006 1H2.994C1.894 1 1 1.895 1 2.996zm-1 0A2.997 2.997 0 0 1 2.994 0h14.012A3.001 3.001 0 0 1 20 2.996v22.008A2.997 2.997 0 0 1 17.006 28H2.994A3.001 3.001 0 0 1 0 25.004V2.996z"></path>
                                                    <path d="M9 23h2v2H9z"></path>
                                                </g>
                                            </svg>
                                        </a>
                                        <a href="javascrpit:void(0);" data-hook="mobile_view" class="view_switch_btn">
                                            <svg width="12" height="22" viewBox="0 0 12 22" xmlns="http://www.w3.org/2000/svg">
                                                <g fill="#000" fill-rule="evenodd">
                                                    <path d="M1 3.001V19C1 20.105 1.894 21 2.997 21h6.006A2 2 0 0 0 11 18.999V3A1.999 1.999 0 0 0 9.003 1H2.997A2 2 0 0 0 1 3.001zm-1 0A3 3 0 0 1 2.997 0h6.006A2.999 2.999 0 0 1 12 3.001V19A3 3 0 0 1 9.003 22H2.997A2.999 2.999 0 0 1 0 18.999V3z"></path>
                                                    <path d="M5 18h2v2H5z"></path>
                                                </g>
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                <div class="m-auto ml-md--auto">
                                    <div class="ml-4">
                                        <select name="" class="form-control" id="header">
                                            <option disabled selected hidden>Different Header style</option>
                                            <option value="0">None Set</option>
                                            @foreach($headers as $header)
                                                <option value="{{$header->id}}">{{$header->name}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="m-auto ml-mr--auto">
                                    <div class="ml-4">
                                        <select name="footer" class="form-control"  id="footer">
                                            <option disabled selected hidden>Different Footer style</option>
                                            <option value="0">None Set</option>
                                            @foreach($footers as $footer)
                                                <option value="{{$footer->id}}">{{$footer->name}}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <!-- menu area -->
                                <ul class="ml-auto" id="nav">
                                    <li >
                                        <a href="{{route('template.preview', $template->slug)}}" class="btn m-btn--sm m-btn--hover-info" target="_blank">View demo site <i class="fa fa-external-link-alt"></i></a>
                                    </li>
                                </ul>
                                <!-- end menu area -->

                                <!-- start attribute navigation -->
                                <div class="attr-nav sm-no-margin ">
                                    <ul>
                                        <li >
                                            <a href="{{route('template.start', $template->slug)}}"  class="btn m-btn--sm m-btn--hover-info" >Start with this template</a>
                                        </li>
                                    </ul>
                                </div>
                                <!-- end attribute navigation -->

                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class="template_demo_area">
        <div class="desktop_view_area parent_iframe_area">
            <div class="mobile_top_cover device_frame_area">
                <div class="mobile_top_cover_line"></div>
            </div>
            <iframe src="{{route('template.preview', $template->slug)}}" width="100%" height="100%" class="desktop_iframe preview_iframe"></iframe>
            <div class="mobile_bottom_cover device_frame_area"></div>
        </div>
    </div>
</div>

<script src="{{mix('assets/js/script.js')}}"></script>

<script>
    var demo = "{{route('template.preview', $template->slug)}}";
    var parameter = '';

    $(".view_switch_btn").click(function() {
        $(".parent_iframe_area").removeClass().addClass('parent_iframe_area').addClass($(this).data("hook")+"_area");
    });
    $("#header").change(function() {
        updateFrame();
    });
    $("#footer").change(function() {
        updateFrame();
    });
    // $(".view_demo_site").click(function() {
    //     window.open(demo+parameter);
    // });
    function updateFrame()
    {
        var $header = $("#header").val();
        var $footer = $("#footer").val();

        parameter =  "?hid=" + $header + "&fid=" + $footer

        $(".preview_iframe").prop("src", demo+parameter);
    }

</script>
</body>

</html>
