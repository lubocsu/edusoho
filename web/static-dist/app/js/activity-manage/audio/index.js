webpackJsonp(["app/js/activity-manage/audio/index"],{"8533a2a15206a0ac5cb6":function(e,n,a){"use strict";function t(e){return e&&e.__esModule?e:{default:e}}function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(e,n){for(var a=0;a<n.length;a++){var t=n[a];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(n,a,t){return a&&e(n.prototype,a),t&&e(n,t),n}}(),o=a("eca7a2561fa47d3f75f6"),u=t(o),d=a("f324dbdea53170d5000f"),s=function(){function e(){r(this,e),(0,d.showChooserType)($('[name="ext[mediaId]"]')),this.initStep2Form(),this.autoValidatorLength(),this.initFileChooser()}return i(e,[{key:"initStep2Form",value:function(){var e=$("#step2-form");e.data("validator");e.validate({groups:{nameGroup:"minute second"},rules:{title:{required:!0,maxlength:50,trim:!0,course_title:!0},minute:"required unsigned_integer unsigned_integer",second:"required second_range unsigned_integer","ext[mediaId]":"required"},messages:{minute:{required:Translator.trans("activity.audio_manage.length_required_error_hint"),unsigned_integer:Translator.trans("activity.audio_manage.length_unsigned_integer_error_hint")},second:{required:Translator.trans("activity.audio_manage.length_required_error_hint"),second_range:Translator.trans("activity.audio_manage.second_range_error_hint"),unsigned_integer:Translator.trans("activity.audio_manage.length_unsigned_integer_error_hint")},"ext[mediaId]":Translator.trans("activity.audio_manage.media_error_hint")}})}},{key:"autoValidatorLength",value:function(){$(".js-length").blur(function(){var e=$("#step2-form").data("validator");if(e&&e.form()){var n=0|parseInt($("#minute").val()),a=0|parseInt($("#second").val());$("#length").val(60*n+a)}})}},{key:"initFileChooser",value:function(){var e=new u.default,n=function(e){(0,d.chooserUiClose)();var n=function(e){if(0!==e.length&&void 0!==e.length){var n=$("#minute"),a=$("#second"),t=parseInt(e.length),r=parseInt(t/60),i=t%60;n.val(r),a.val(i),$length.val(t),e.minute=r,e.second=i}$('[name="media"]').val(JSON.stringify(e))};n(e),$('[name="ext[mediaId]"]').val(e.source),"self"==e.source?($("#ext_mediaId").val(e.id),$("#ext_mediaUri").val("")):($("#ext_mediaId").val(""),$("#ext_mediaUri").val(e.uri))};e.on("select",n)}}]),e}();n.default=s},0:function(e,n,a){"use strict";function t(e){return e&&e.__esModule?e:{default:e}}var r=a("8533a2a15206a0ac5cb6"),i=t(r);new i.default}});