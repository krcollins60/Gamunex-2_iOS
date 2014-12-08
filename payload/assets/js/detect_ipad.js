var touchstartOrClick = "";

function isiPad() {
	return (navigator.platform.indexOf("iPad") != -1);
}

if (isiPad()) {
	touchstartOrClick = "touchstart";
	$('.viewer').css("overflow", "scroll");
} else {
	touchstartOrClick = "click";
}