
<footer>
    <div class="container">
        <div class="row">

            <div class="col-lg-4 col-md-6 sm-margin-30px-bottom">
                <div class="w-100 mt-4">
                    <a href="/" class="footer-logo">
                        <img src="{{asset("assets/img/logo.png")}}" alt="">
                    </a>
                    <form action="{{route('subscribe')}}" class="newsletter_form" method="POST">
                        @csrf
                        <div class="form-group">
                            <label for="newsletter_email" class="text-white">Subscribe to Newsletter</label>
                            <div class="input-group">
                                <input type="email" class="form-control" name="newsletter_email" id="newsletter_email" placeholder="Email Address" required>
                                <button type="submit" class="btn subscribe_btn" style="padding: 0!important;">Subscribe</button>
                            </div>
                            <div class="form-control-feedback error-newsletter_email"></div>
                        </div>
                        <p>Join the newsletter to get notification.</p>
                    </form>
                </div>
                <div class="d-flex my-4">
                    <a href="https://facebook.com" class="d-block" target="_blank"><img src="{{asset('assets/img/social/facebook.png')}}" alt="" class="w-30px"></a>
                    <a href="https://twitter.com" class="d-block ml-3" target="_blank"><img src="{{asset('assets/img/social/twitter.png')}}" alt="" class="w-30px"></a>
                    <a href="https://instagram.com" class="d-block ml-3" target="_blank"><img src="{{asset('assets/img/social/instagram.png')}}" alt="" class="w-30px"></a>
                    <a href="https://youtube.com" class="d-block ml-3" target="_blank"><img src="{{asset('assets/img/social/youtube.png')}}" alt="" class="w-30px"></a>
                    <a href="https://linkedin.com" class="d-block ml-3" target="_blank"><img src="{{asset('assets/img/social/linkedin.png')}}" alt="" class="w-30px"></a>
                </div>
            </div>

            <div class="col-lg-3 col-md-6 sm-margin-30px-bottom">
                <h3 class="text-theme">Products</h3>
                @isWhitelisted
                <ul class="footer-list">
                    <li><a href="{{route('template.index')}}">Website Templates</a></li>
                    <li><a href="{{route('package.index')}}">Packages</a></li>
                    <li><a href="{{route('readymade.index')}}">Ready Made Biz</a></li>
                    <li><a href="{{route('module.index')}}">Modules</a></li>
                    <li><a href="{{route('plugin.index')}}">Plugins</a></li>
                    <li><a href="{{route('service.index')}}">Services</a></li>
                    <li><a href="{{route('blog.package')}}">Blogging</a></li>
                    <li><a href="{{route('blogAds.index')}}">Blog Advertisement</a></li>
                </ul>
                @endisWhitelisted
            </div>
            <div class="col-lg-3 col-md-6 sm-margin-30px-bottom">
                <h3 class="text-theme">Company</h3>
                <ul class="footer-list">
                    <li><a href="/">About</a></li>
                    <li><a href="/portfolio">Portfolio</a></li>
                    <li><a href="/legal/terms-and-conditions">Terms and Conditions</a></li>
                    <li><a href="/legal/privacy-policy">Privacy Policy</a></li>
                    <li><a href="/legal/disclaimer">Disclaimer</a></li>
                </ul>
            </div>
            <div class="col-lg-2 col-md-6 sm-margin-30px-bottom">
                <h3 class="text-theme">Help Center</h3>
                <ul class="footer-list">
                    @isWhitelisted
                    <li><a href="#" onclick="window.open('/livechat', 'LiveChat', 'width=572, height=759')">Live Chat Support</a></li>
                    @endisWhitelisted
                    <li><a href="{{route('faq.index')}}">FAQ</a></li>
                    <li><a href="/">Contact Us</a></li>
                </ul>
            </div>
        </div>
        <div style="height:80px"></div>
    </div>
</footer>
