import axios from 'axios';

const body = 
[
    {
        "name": "Oliver",
        "age": 19,
        "grade": "A",
        "assignments": [
            {
                "title": "Math",
                "score": 65
            },
            {
                "title": "Science",
                "score": 70
            }
        ]
    },
    {
        "name": "Emma",
        "age": 20,
        "grade": "A",
        "assignments": [
            {
                "title": "Math",
                "score": 68
            },
            {
                "title": "Science",
                "score": 72
            }
        ]
    },
    {
        "name": "Liam",
        "age": 18,
        "grade": "A",
        "assignments": [
            {
                "title": "Math",
                "score": 75
            },
            {
                "title": "Science",
                "score": 78
            }
        ]
    },
    {
        "name": "Ava",
        "age": 21,
        "grade": "A",
        "assignments": [
            {
                "title": "Math",
                "score": 80
            },
            {
                "title": "Science",
                "score": 85
            }
        ]
    },
    {
        "name": "Noah",
        "age": 22,
        "grade": "A",
        "assignments": [
            {
                "title": "Math",
                "score": 90
            },
            {
                "title": "Science",
                "score": 88
            }
        ]
    }
];
const signIn = async (url, email, pass)=>{
    const jwtToken = await axios.post(url, {
        email:email,
        password:pass
    });
    return jwtToken.data;
}

const populateDb = async (url,body)=>{
    // const jwtAuth = await signIn("http://localhost:3200/api/users/signin", "seller4@ecom.com", "1234");
    await body.forEach(item=> {
        // axios.post(url,rating, {
        //     headers:{
        //         Authorization:jwtAuth
        //     }
        // });
        // console.log(typeof(item));
        axios.post(url, item);
    });

    console.log("task completed");
}
populateDb("http://localhost:3000/api/student/add-student", body);