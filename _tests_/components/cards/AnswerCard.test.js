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
      url: "https://hekani-social-media.herokuapp.com/api/v1/follow",
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
      url: "https://hekani-social-media.herokuapp.com/api/v1/unfollow",
      method: "DELETE",
      headers: headersList,
      data: bodyContent,
    };

    axios.request(reqOptions).then(function (response) {
      expect(response.data.status).toBe("Successfully unfollowed");
    });
  });
});
