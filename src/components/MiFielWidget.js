import React, { useEffect } from "react";

function MifielWidget({
  widgetId,
  appendTo,
  successBtnText,
  onSuccess,
  onError,
  sandbox,
  pdf,
}) {
  useEffect(() => {

    if (!window.mifiel) {
      (function (window, document) {
        ("use strict");
        if (!document.getElementById("mifiel-js")) {
          const script = document.createElement("script");
          script.async = !0;
          script.id = "mifiel-js";
          script.type = "text/javascript";
          script.src = sandbox
            ? "https://sandbox.mifiel.com/sign-widget-v1.0.0.js"
            : "https://www.mifiel.com/sign-widget-v1.0.0.js";
          document.body.appendChild(script);
        }
        window.mifiel = window.mifiel || [];
        for (
          var e = ["widget"],
            i = function (e) {
              return function () {
                window.mifiel.push(
                  [e].concat(Array.prototype.slice.call(arguments, 0))
                );
              };
            },
            t = 0;
          t < e.length;
          t++
        ) {
          var n = e[t];
          window.mifiel[n] || (window.mifiel[n] = i(n));
        }
      })(window, document);
    }

    if (window.mifiel) {
      window.mifiel.widget({
        widgetId,
        appendTo,
        successBtnText,
        onSuccess,
        onError,
        pdf,
      });
    }
  }, [widgetId, appendTo, successBtnText, onSuccess, onError]);

  return <div id={appendTo}></div>;
}


MifielWidget.defaultProps = {
    successButtonText: 'OK',
    appendTo: 'mifiel_id',
    sandbox: true,
  };

export default MifielWidget;
