@if($seo['keywords']??null)
    <meta name="keywords" content="{{$seo['keywords']}}" />
@endif

@if($seo['description']??null)
    <meta name="description" content="{{$seo['description']}}">
@endif

@if($seo['image']??null)
    <meta name="og:image" content="{{uploadUrl($seo['image'])}}">
@endif
