import axios from "axios";

describe("<AnswerCard />", () => {
  it("follows the user", () => {
    let headersList = {
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      followed_id: 11,
    });

    let reqOptions = {
      url: "https://hekani-social-media.herokuapp.com/api/v1/relationships",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    axios.request(reqOptions).then(function (response) {
      expect(response.data.status).toBe("Successfully followed");
    });
  });

  it("unfollows the user", () => {
    let headersList = {
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      followed_id: 11,
    });

    let reqOptions = {
      url: "https://hekani-social-media.herokuapp.com/api/v1/relationships/1",
      method: "DELETE",
      headers: headersList,
      data: bodyContent,
    };

    axios.request(reqOptions).then(function (response) {
      expect(response.data.status).toBe("Successfully unfollowed");
    });
  });

  it("checks if user is following a user", () => {
    let headersList = {
      "Access-Control-Allow-Origin":
        "https://hekani-social-media.herokuapp.com/api/v1",
    };

    let bodyContent = JSON.stringify({
      followed_id: 2,
    });

    let reqOptions = {
      url: "https://hekani-social-media.herokuapp.com/api/v1/does_user_follow_user",
      method: "GET",
      headers: headersList,
      data: bodyContent,
    };

    axios.request(reqOptions).then(function (response) {
      expect(response.data.status).toBe("200");
    });
  });
});
