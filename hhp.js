(function () {
     function removeAllChild(elem) {
         while (elem.hasChildNodes())
             elem.removeChild(elem.firstChild);
     }

     window.addEventListener(
         "load",
         function () {
             var inputArea  = document.getElementById("input");
             var resultArea = document.getElementById("result");

             removeAllChild(resultArea);
             var dummyHolder = document.createElement("div");
             resultArea.appendChild(dummyHolder);

             function onUpdate(ev) {
                 var code = inputArea.value;
                 var pret = Prettifier.prettify(code);

                 var newHolder = document.createElement("div");
                 newHolder.appendChild(pret);
                 resultArea.replaceChild(newHolder, dummyHolder);
                 dummyHolder = newHolder;
             }

             // inputArea.addEventListener("keyup", onUpdate, false);
             // inputArea.addEventListener("blur", onUpdate, false);
             inputArea.addEventListener("input", onUpdate, false);
         }, false);
 })();
