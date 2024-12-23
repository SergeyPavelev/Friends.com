$(document).ready(function() {
    $('#input-message-form').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
    
        var element = document.getElementById('SendMessageForm');
        var textarea = element.textarea.value;

        if(!textarea) {
            return;
        };
                    
        if (textarea != "") {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: {
                    textarea: textarea,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                },
    
                success: function(data) {
                    $('#SendMessageForm textarea').val('');
                    
                    user = data['success']['user'];
                    sender_message = data['success']['sender_message'];
                    text_message = data['success']['textarea'];
                    time_created_message = data['success']['time_created'];

                    var list_messages = document.querySelector('.lists-messages');
                    
                    if (user == sender_message) {
                        var message = `
                            <div class="block-message-me">
                                <div class="block-message-buttons">
                                    <div class="block-message-button">
                                        <form action="{% url 'messenger:edit_message' receiver_id=receiver_id message_id=message.id %}">
                                            {% csrf_token %}
                                            <button type="submit">
                                                <i class='bx bxs-edit'></i>
                                            </button>
                                        </form>
                                    </div>
            
                                    <div class="block-message-button">
                                        <form action="{% url 'messenger:delete_message_from_everyone' message_id=message.id %}" method="post">
                                            {% csrf_token %}
                                            <button type="submit">
                                                <i class='bx bx-trash'></i>
                                            </button>
                                        </form>
                                    </div>
            
                                    <div class="block-message-button">
                                        <form action="{% url 'messenger:delete_message_from_me' message_id=message.id %}" method="post">
                                            {% csrf_token %}
                                            <button type="submit">
                                                <i class='bx bx-trash'></i>
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                <div class="block-text-message">
                                    <li class="message-info">
                                        <span class="message-sender">${sender_message}</span>
                                        <div class="message-text">
                                            <p>${text_message}</p>
                                            <span class="message-time-created">${time_created_message}</span>
                                        </div>
                                    </li>
                                </div>

                                {% if message.sender.avatar %}
                                    <div class="block-message-img">
                                        <img src="{{ message.sender.avatar.url }}" alt="User-avatar">
                                    </div>
                                {% else %}
                                    <div class="block-message-img">
                                        {% if request.user.theme == 'Light' %}
                                            <img src="{% static 'img/user-avatar-black.png' %}" alt="User-avatar">
                                        {% else %}
                                            <img src="{% static 'img/user-avatar-white.png' %}" alt="User-avatar">
                                        {% endif %}
                                    </div>
                                {% endif %}
                            </div>
                        `
                    } else {
                        var message = `
                            <div class="block-message-receiver">
                                <div class="block-text-message">
                                    <li class="message-info">
                                        <span class="message-sender">${sender_message}</span>
                                        <div class="message-text">
                                            <p>${text_message}</p>
                                            <span class="message-time-created">${time_created_message}</span>
                                        </div>
                                    </li>
                                </div>
            
                                <div class="block-message-buttons">
                                    <div class="block-edit-buttons">
                                        <div class="block-message-button">
                                            <form action="{% url 'messenger:delete_message_from_everyone' message_id=message.id %}" method="post">
                                                {% csrf_token %}
                                                <button type="submit">
                                                    <i class='bx bx-trash'></i>
                                                </button>
                                            </form>
                                        </div>
                
                                        <div class="block-message-button">
                                            <form action="{% url 'messenger:delete_message_from_me' message_id=message.id %}" method="post">
                                                {% csrf_token %}
                                                <button type="submit">
                                                    <i class='bx bx-trash'></i>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                    };
                    
                    list_messages.insertAdjacentHTML('beforeend', message);
                },
    
                error: function (data) {
                    alert(data['errors']);
                },
            });
        };
    });
});
