const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyQu1VVjCtL1Ll0uGV0F00fnR0pZoJOitMNiU7xV26shFnD0HSD4PIseB895jQ1U3Dd/exec";

const popup = document.getElementById("popup");
const continueBtn = document.getElementById("continueBtn");
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const resultPopup = document.getElementById("resultPopup");
const giftText = document.getElementById("giftText");
const closeResult = document.getElementById("closeResult");

let currentRotation = 0;

let user = {};

continueBtn.onclick = () => {

    const firstName =
        document.getElementById("firstName").value.trim();

    const lastName =
        document.getElementById("lastName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    if (!firstName || !lastName || !email) {

        alert("Заполните все поля");

        return;

    }

    user = {

        firstName,

        lastName,

        email

    };

    popup.style.display = "none";

};

function spinWheel() {

    currentRotation +=
        1800 +
        Math.random() * 360;

    wheel.style.transition =
        "transform 5s ease-out";

    wheel.style.transform =
        `rotate(${currentRotation}deg)`;

}

async function getGiftFromServer() {

    const response =
        await fetch(SCRIPT_URL, {

            method: "POST",

const formData = new URLSearchParams();

formData.append("firstName", user.firstName);
formData.append("lastName", user.lastName);
formData.append("email", user.email);

const response = await fetch(SCRIPT_URL, {
    method: "POST",
    body: formData
});

                firstName: user.firstName,

                lastName: user.lastName,

                email: user.email

            })

        });

    return await response.json();

}

spinBtn.onclick = async () => {

    spinBtn.disabled = true;

    spinWheel();

    try {

        const result =
            await getGiftFromServer();

        setTimeout(() => {

            if (!result.success) {

                alert(result.message);

                spinBtn.disabled = false;

                return;

            }

            giftText.innerHTML =
                `Ваш номер подарка <strong>№${result.gift}</strong>`;

            resultPopup.classList.remove(
                "hidden"
            );

            spinBtn.disabled = false;

        }, 5000);

    }

    catch (e) {

        setTimeout(() => {

            alert("Ошибка соединения с сервером");

            console.error(e);

            spinBtn.disabled = false;

        }, 5000);

    }

};

closeResult.onclick = () => {

    resultPopup.classList.add(
        "hidden"
    );

};