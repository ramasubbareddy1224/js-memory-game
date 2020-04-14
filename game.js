const cardMasterItems = [
    'A', 'B', 'C', 'D', 'E', 'F', 'A', 'B', 'C', 'D', 'E', 'F'
]
cardMasterItems.sort(() => 0.5 - Math.random());
var selectedItems = [];
function generateBoard() {
    var counter = 0;
    var divmainContainer = document.querySelector('#container');
    for (let index = 0; index < 3; index++) {
        var divflex = document.createElement('div');
        divflex.setAttribute('class', 'flex-container');
        for (let inner = 0; inner < 4; inner++, counter++) {
            var divinner = document.createElement('div');
            divinner.setAttribute('class', 'inner-div-bg');
            divinner.setAttribute('data-index', counter);
            divinner.innerHTML = "?";
            divinner.addEventListener('click', checkElementMatch);
            divflex.appendChild(divinner);
        }
        divmainContainer.appendChild(divflex);

    }
}
function checkElementMatch(event) {

    const element = event.target;
    if (element.innerHTML == "?" && selectedItems.length<=1) {
        const elementVal = element.getAttribute('data-index');
        element.innerHTML = cardMasterItems[elementVal];
        var item = { ele: element, val: cardMasterItems[elementVal] };
        selectedItems.push(item);
        if (selectedItems.length == 2) {
            if (selectedItems[0].val != selectedItems[1].val) {
                setTimeout(() => {
                    element.innerHTML = "?";
                    selectedItems[0].ele.innerHTML = "?";
                    selectedItems = [];
                }, 1000);
            } else {
                selectedItems = [];
                const matchedElements = Array.from(document.querySelectorAll('.inner-div-bg')).reduce((acc, curr) => acc += curr.innerHTML != "?" ? 1 : 0, 0);
                if (matchedElements == cardMasterItems.length) {
                    setTimeout(()=>{
                        window.alert('You Won!!');
                        location.reload();
                    },500);
                }
            }

        }
    }
}
generateBoard();