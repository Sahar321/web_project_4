/// imports
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { initialCards } from "./initialData.js"
import { formConfigIndex } from "./ConfigData.js"
import { openPopup, closePopup } from "./utilits.js";


/// Variables
const cardsList = document.querySelector(".cards")

const profileName = document.querySelector(".profile__name")
const profileTitle = document.querySelector(".profile__title")
const profileEdit = document.querySelector('.profile__edit-info')
const profileAddCard = document.querySelector('.profile__add')

const formProfile = document.querySelector('#formProfile')
const formProfileName = document.querySelector("[name='profileName']")
const formProfileTitle = document.querySelector("[name='profileTitle']")
const formProfileValidator = new FormValidator(formConfigIndex, formProfile)


const formCard = document.querySelector('#formCard')
const formCardUrl = document.querySelector("[name='CardURL']")
const formCardTitle = document.querySelector("[name='CardTitle']")
const formCardValidator = new FormValidator(formConfigIndex, formCard)




init();

function init() {
    initialCards.forEach(renderCard)

    formProfileValidator.enableValidation()
    formCardValidator.enableValidation()

}

//Profile
function profileEditHandler() {
    formProfileName.value = profileName.textContent
    formProfileTitle.value = profileTitle.textContent
    formProfileValidator.resetValidation()
    openPopup(formProfile);
}


function formProfileSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = formProfileName.value
    profileTitle.textContent = formProfileTitle.value
    closePopup()
}

// Card
function renderCard(cardData) {
    const card = new Card(cardData, "#card")
    cardsList.prepend(card.createCard());
}

function openAddForm() {
    document.forms["formCard"].reset();
    formCardValidator.resetValidation()
    openPopup(formCard);
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();

    const cardData = { name: formCardTitle.value, link: formCardUrl.value };
    renderCard(cardData)
    closePopup()
}
/// Event Listeners
profileEdit.addEventListener("click", profileEditHandler);
profileAddCard.addEventListener("click", openAddForm)

formProfile.addEventListener("submit", formProfileSubmitHandler);

formCard.addEventListener("submit", handleAddFormSubmit);