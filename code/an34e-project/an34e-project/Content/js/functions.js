
$(document).ready(function () {
    $('#tableCustomers')/*.DataTable()*/;
    $('#tableEvaluations')/*.DataTable()*/;
    $('#tableQuestion')/*.DataTable()*/;
    $('#divShowCustomer').hide();
    $('#divShowArea').hide();
    $('#divShowQuestion').hide();

    $('#btnAdd').click(function () {
        if (validate() == false)
            return;
        $.ajax({
            url: '/Customer/SaveCustomer',
            type: 'POST',
            data: {
                id: $("#id").val(),
                name: $("#name").val(),
                responsible: $("#responsible").val()
            },
            error: function () {
                alert("Não foi possível realizar a operação!\nHouve um problema no envio da sua requisição!");

            },
            success: function (data) {
                if (data.success == true) {
                    alert("Cliente cadastrado com sucesso")
                    window.location.replace("/Home/Customers?IdArea=-1");
                }
                else {
                    alert("Houve um problema ao registrar o Cliente!");
                }

            }
        });
    });
});

function setIdModal(idArea) {
    $('#idArea').val(idArea);
}

function btnAddEvaluation() {
    //alert($("#idArea").val());
    $.ajax({
        url: '/Evaluation/SaveEvaluation',
        type: 'POST',
        data: {
            teste: $("#idArea").val(),
            month: $("#month").val(),
            year: $("#year").val(),

        },
        error: function () {
            alert("Não foi possível realizar a operação!\nHouve um problema no envio da sua requisição!");

        },
        success: function (data) {

            if (data.HasEvaluation == true) {
                alert("Avaliação não foi registrada!\nVerifique já existe uma avaliação em andamento para esta área.\nVerifique se já existe uma avaliação cadastrada para o mês selecionado.");
                return;

            }
            if (data.Save == false) {
                alert("Houve um problema ao registrar a Avaliação!");
            }
            else if (data.Save == true) {
                alert("Avaliação cadastrada com sucesso!");
                window.location.replace("/Home/Evaluation");
            }

        }
    });

    //$.ajax({
    //    url: '/Evaluation/SaveEvaluation',
    //    type: 'POST',
    //    data: {
    //        id: idArea,
    //        month: $("#month").val(),
    //        year: $("#year").val(),

    //    },
    //    error: function () {
    //        alert("Não foi possível realizar a operação!\nHouve um problema no envio da sua requisição!");

    //    },
    //    success: function (data) {
    //        if (data.success == true) {
    //            alert("Avaliação cadastrada com sucesso")
    //            // $.post("/Home/Customers", { IdArea: 2 }, function (data) { $("#modalCustomer").modal("hide"); });
    //            window.location.replace("/Home/Evaluation");
    //        }
    //        else {
    //            alert("Houve um problema ao registrar a Avaliação!");
    //        }

    //    }
    //});
    //});
}

function validate() {

    if ($("#title").val() == "" || $("#title").val() == "" || $("#responsible").val() == ""
        || $("#email").val() == "" || $("#phone").val() == "" || $("#area").val() == "") {
        //demo.showNotification('top', 'center');
        alert("Todos os campos são obrigatórios, por favor preencha-os!");
        return false;
    }


}

function ShowCustomer(IdCustomer) {
    var currentCustomer = 0;
    $.ajax({
        url: '/Customer/LoadCustomer',
        type: 'POST',
        data: { Id: IdCustomer, },
        error: function () {
            alert("Não foi possível realizar a operação!");

        },
        success: function (customer) {


            $('#divShowCustomer').show();//exibe div com botoes

            var obj = JSON.parse(customer);
            currentCustomer = obj.Id;
            $('#nameShow').val(obj.Name);
            $('#nameShow').prop('disabled', false);
            $('#responsibleShow').val(obj.Responsible);
            $('#responsibleShow').prop('disabled', false);
            $('#sinceDateShow').val(obj.CustomerSince);
            $('#sinceDateShow').prop('disabled', false);
        }
    });
}

function editCustomer() {

    $.ajax({
        url: '/Customer/GetCustomerEdit?id=' + currentCustomer,
        type: 'GET',
        error: function () {
            alert("Não foi possível realizar a operação!");

        },
        success: function (customer) {


            $("#modalCustomer").modal(); //abre a modal

            var obj = JSON.parse(customer);
            $('#id').val(obj.Id);
            $('#title').val(obj.Title);
            $('#responsible').val(obj.Responsible);
            $('#email').val(obj.Email);
            $('#phone').val(obj.Phone);
            $('#area').val(obj.Area.Title);

        }
    });
}

function showModal() {
    clearForm();
}

function clearForm() {
    $('#id').val('0');
    $('#title').val('');
    $('#responsible').val('');
    $('#email').val('');
    $('#phone').val('');
}

function deleteCustomer() {
    alert("Tem certeza que deseja remover esse Cliente?\nEssa opção não poderá ser desfeita.")
    $.ajax({
        url: '/Customer/DeleteCustomer?id=' + currentCustomer,
        type: 'POST',
        error: function () {
            alert("Não foi possível realizar a operação!");

        },
        success: function (data) {
            if (data.success) {
                alert("Cliente removido com sucesso.");
                window.location.replace("/Home/Customers?IdArea=-1");
            } else {
                alert("Houve um problema ao excluir o Cliente!");
            }
        }
    });
}

demo = {
    showNotification: function (from, align) {

        color = 1;

        $.notify({
            icon: "pe-7s-attention",
            message: "Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer."

        }, {
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
    }
}

var currentQuestion = 0;

function ShowQuestion(IdQuestion) {
    $.ajax({
        url: '/Question/Load',
        type: 'POST',
        data: { Id: IdQuestion, },
        error: function () {
            alert("Não foi possível realizar a operação!");

        },
        success: function (question) {
            $('#divShowQuestion').show();//exibe div com botoes

            var obj = JSON.parse(question);
            currentQuestion = obj.Id;
            $('#PerguntaShow').val(obj.Quest);
            $('#PerguntaShow').prop('disabled', false);
            $('#NivelShow').val(obj.Level);
            $('#NivelShow').prop('disabled', false);
            $('#NivelNecessarioShow').val(obj.RequiredLevel);
            $('#NivelNecessarioShow').prop('disabled', false);
        }
    });
}

function editQuestion() {
    $.ajax({
        url: '/Question/Edit',
        type: 'POST',
        data: {
            Id: currentQuestion,
            Quest: $("#PerguntaShow").val(),
            Level: $("#NivelShow").val(),
            RequiredLevel: $("#NivelNecessarioShow").val()
        },
        error: function () {
            alert("Não foi possível realizar a operação!\nHouve um problema no envio da sua requisição!");

        },
        success: function (data) {
            if (data == "{success:True}") {
                alert("Pergunta editada com sucesso!");
                window.location.replace("/Home/Question");
            } else
                alert("Não foi possível realizar o cadastro.");
        }
    });
}

function btnAddQuestion() {
    $.ajax({
        url: '/Question/Insert',
        type: 'POST',
        data: {
            Quest: $("#question").val(),
            Level: $("#level").val(),
            RequiredLevel: $("#required_lever").val(),

        },
        error: function () {
            alert("Não foi possível realizar a operação!\nHouve um problema no envio da sua requisição!");

        },
        success: function (data) {
            if (data == "{success:True}") {
                alert("Pergunta cadastrada com sucesso!");
                window.location.replace("/Home/Question");
            } else
                alert("Não foi possível realizar o cadastro.");
        }
    });
}

function deleteQuestion() {
    ret = confirm("Tem certeza que deseja remover essa Pergunta?");
    if (ret == true) {
        $.ajax({
            url: '/Question/Remove?id=' + currentQuestion,
            type: 'POST',
            error: function () {
                alert("Não foi possível realizar a operação!");

            },
            success: function (data) {
                if (data) {
                    alert("Pergunta removida com sucesso.");
                    window.location.replace("/Home/Question");
                } else {
                    alert("Houve um problema ao excluir a Pergunta!");
                }
            }
        });
    }
    else { }
    
}

function btnLogoff() {
    $.ajax({
        url: '/User/Logoff',
        type: 'POST',
        success: function (data) { }
    });
}

function SearchQuest(level, requiredLevel, isNps) {
    $.ajax({
        url: '/Avaliation/QueryQuestionNps',
        type: 'POST',
        data: { level: level, requiredLevel: requiredLevel, isNps: isNps},
        error: function () {
            alert("Não foi possível encontrar a a pergunta!");

        },
        success: function (avaliation) {
            $('#divPergunta1').show();

            var obj = JSON.parse(avaliation);
            $('#pergunta1').text(obj);
        }
    });
}

function SearchNextQuest(){
    var pergunta1 = $('#resposta1').val();
    if (pergunta1 > "0" && pergunta1 < "7") {
        $.ajax({
            url: '/Avaliation/QueryQuestionNps',
            type: 'POST',
            data: { level: 2, requiredLevel: 1, isNps: 1 },
            error: function () {
                alert("Não foi possível encontrar a a pergunta!");

            },
            success: function (avaliation) {
                $('#divPergunta2').show();

                var obj = JSON.parse(avaliation);
                $('#pergunta2').text(obj);
            }
        });
    }
    if (pergunta1 > "6" && pergunta1 < "9") {
        $.ajax({
            url: '/Avaliation/QueryQuestionNps',
            type: 'POST',
            data: { level: 3, requiredLevel: 1, isNps: 1 },
            error: function () {
                alert("Não foi possível encontrar a a pergunta!");

            },
            success: function (avaliation) {
                $('#divPergunta2').show();

                var obj = JSON.parse(avaliation);
                $('#pergunta2').text(obj);
            }
        });
    }
    if (pergunta1 > "8") {
        $.ajax({
            url: '/Avaliation/QueryQuestionNps',
            type: 'POST',
            data: { level: 4, requiredLevel: 1, isNps: 1 },
            error: function () {
                alert("Não foi possível encontrar a a pergunta!");

            },
            success: function (avaliation) {
                $('#divPergunta2').show();

                var obj = JSON.parse(avaliation);
                $('#pergunta2').text(obj);
            }
        });
    }
}

function BtnAvaliation() {
    var pergunta2 = $('#resposta2').val();
    if (pergunta2.length > 0) {
        $('#btnAvaliation').show();
    }
}

function saveAvaliation() {
    //$.ajax({
    //    url: '/Avaliation/Insert',
    //    type: 'POST',
    //    data: {
    //        Question1: $("#pergunta1").val(),
    //        Question2: $("#pergunta2").val()            

    //    },
    //    error: function () {
    //        alert("Não foi possível realizar a operação!\nHouve um problema no envio da sua requisição!");

    //    },
    //    success: function (data) {
    //        if (data == "{success:True}") {
    //            alert("Pergunta cadastrada com sucesso!");
    //            window.location.replace("/Home/Avaliation");
    //        } else
    //            alert("Não foi possível realizar a avaliação.");
    //    }
    //});
}


