function getGreeting(username) {
    const greetings = [
        "Добро пожаловать, [Имя]! Мы рады видить вас снова на нашем сайте!",
        "Привет, [Имя]! Как здорово, что вы с нами!",
        "Здравствуйте, [Имя]! Надеемся, у вас отличный день!",
        "Добро пожаловать, [Имя]! Готовы к новым открытиям?",
        "Привет, [Имя]! Мы подготовили для вас много интересного!"
    ];

    const randomIndex = Math.floor(Math.random() * greetings.length);

    console.log(greetings[randomIndex].replace("[Имя]", username));
    
    return greetings[randomIndex].replace("[Имя]", username);
};

function addNotification(username) {
    var text = getGreeting(username);

    const notificationsBlock = document.getElementById('block-notifications');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = text;
    notificationsBlock.append(notification);
    
    setTimeout(() => {
        notification.style.transition = 'opacity 0.5s';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 10000);
};

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('notification');
    if (username) {
        addNotification(username);
    }
});