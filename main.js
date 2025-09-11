//Name: Võ Tuấn Kiệt
//MSSV: 1911060146


let currentMaxId = "0";
LoadData();
//GET: domain:port//posts
//GET: domain:port/posts/id
async function LoadData() {
    try {
        let data = await fetch('http://localhost:3000/posts');
        let posts = await data.json();
        let body = document.getElementById("body");
        body.innerHTML = '';

        const activePosts = posts.filter(post => !post.isDeleted);

        if (posts.length > 0) {
            currentMaxId = Math.max(...posts.map(post => post.id));
        } else {
            currentMaxId = 0;
        }
        for (const post of activePosts) { 
            body.innerHTML += convertDataToHTML(post);
        }
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
    }
}
function LoadDataA() {
    fetch('http://localhost:3000/posts').then(
        function (data) {
            return data.json()
        }
    ).then(
        function (posts) {
            const activePosts = posts.filter(post => !post.isDeleted);
            for (const post of activePosts) { 
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
    let title = document.getElementById("title").value;
    let view = document.getElementById("view").value;

    try {
        currentMaxId++; 
        let newPostData = {
            id: currentMaxId,
            title: title,
            views: view,
            isDeleted: false
        };

        let response = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            body: JSON.stringify(newPostData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (response.ok) {
            console.log("Thêm mới thành công!");
            LoadData(); 
        } else {
            console.error("Lỗi khi thêm mới:", response.statusText);
        }

    } catch (error) {
        console.error("Lỗi khi lưu dữ liệu:", error);
    }
}

//DELETE: domain:port//posts/id
async function Delete(id){
    try {
        let response = await fetch('http://localhost:3000/posts/' + id, {
            method: 'PATCH', 
            body: JSON.stringify({ isDeleted: true }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            console.log("Xóa mềm thành công");
            LoadData();
        } else {
            console.error("Lỗi khi xóa:", response.statusText);
        }
    } catch (error) {
        console.error("Lỗi khi xóa dữ liệu:", error);
    }
}