LoadData();
//GET: domain:port//posts
//GET: domain:port/posts/id
async function LoadData() {
    let data = await fetch('http://localhost:3000/posts');
    let posts = await data.json();
    for (const post of posts) {
        let body = document.getElementById("body");
        body.innerHTML += convertDataToHTML(post);
    }
}
function LoadDataA() {
    fetch('http://localhost:3000/posts').then(
        function (data) {
            return data.json()
        }
    ).then(
        function (posts) {
            for (const post of posts) {
                let body = document.getElementById("body");
                body.innerHTML += convertDataToHTML(post);
            }
        }
    )
}

function convertDataToHTML(post) {
    let result = "<tr>";
    result += "<td>" + post.id + "</td>";
    result += "<td>" + post.title + "</td>";
    result += "<td>" + post.views + "</td>";
    result += "<td><input type='submit' value='Delete' onclick='Delete("+post.id+")'></input></td>";
    result += "</tr>";
    return result;
}



//POST: domain:port//posts + body
async function SaveData(){
    let id = document.getElementById("id").value;
    let title = document.getElementById("title").value;
    let view = document.getElementById("view").value;
    try {
        let checkData = await fetch("http://localhost:3000/posts/" + id);

        let dataObj = {
            title: title,
            views: view
        };

        if (checkData.ok) { 
            let response = await fetch('http://localhost:3000/posts/' + id, {
                method: 'PUT',
                body: JSON.stringify(dataObj),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Cập nhật thành công:", response);
        } else { 
            let newPostData = {
                id: id,
                title: title,
                views: view
            };
            let response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                body: JSON.stringify(newPostData),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Tạo mới thành công:", response);
        }

        LoadData();

    } catch (error) {
        console.error("Lỗi khi lưu dữ liệu:", error);
    }   
}

//DELETE: domain:port//posts/id
async function Delete(id){
    try {
        let response = await fetch('http://localhost:3000/posts/' + id, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log("Xóa thành công");
            LoadData();
        } else {
            console.error("Lỗi khi xóa:", response.statusText);
        }
    } catch (error) {
        console.error("Lỗi khi xóa dữ liệu:", error);
    }
}