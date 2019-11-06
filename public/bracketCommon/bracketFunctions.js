var matchProgressions = {
  128: ["m64a","m64b","m65a","m65b","m66a","m66b","m67a","m67b",
  "m68a","m68b","m69a","m69b","m70a","m70b",
  "m71a","m71b","m72a","m72b","m73a","m73b","m74a","m74b",
  "m75a","m75b","m76a","m76b","m77a","m77b","m78a","m78b",
  "m79a","m79b","m80a","m80b","m81a","m81b","m82a","m82b",
  "m83a","m83b","m84a","m84b","m85a","m85b","m86a","m86b",
  "m87a","m87b","m88a","m88b","m89a","m89b","m90a","m90b",
  "m91a","m91b","m92a","m92b","m93a","m93b","m94a","m94b",
  "m95a","m95b","m96a","m96b","m97a","m97b","m98a","m98b",
  "m99a","m99b","m100a","m100b","m101a","m101b","m102a","m102b",
  "m103a","m103b","m104a","m104b","m105a","m105b","m106a","m106b",
  "m107a","m107b","m108a","m108b","m109a","m109b","m110a","m110b",
  "m111a","m111b","m112a","m112b","m113a","m113b","m114a","m114b",
  "m115a","m115b","m116a","m116b","m117a","m117b","m118a","m118b",
  "m119a","m119b","m120a","m120b","m121a","m121b","m122a","m122b",
  "m123a","m123b","m124a","m125a","m124b","m125b","m126a","m126b","winner"],

  64: ["m32a","m32b","m33a","m33b","m34a","m34b","m35a","m35b",
  "m36a","m36b","m37a","m37b","m38a","m38b","m39a","m39b",
  "m40a","m40b","m41a","m41b","m42a","m42b","m43a","m43b",
  "m44a","m44b","m45a","m45b","m46a","m46b","m47a","m47b",
  "m48a","m48b","m49a","m49b","m50a","m50b","m51a","m51b",
  "m52a","m52b","m53a","m53b","m54a","m54b","m55a","m55b",
  "m56a","m56b","m57a","m57b","m58a","m58b","m59a","m59b",
  "m60a","m60b","m61a","m61b","m62a","m62b","winner"],

  32: ["m16a","m16b","m17a","m17b","m18a","m18b","m19a","m19b",
        "m20a","m20b","m21a","m21b","m22a","m22b","m23a","m23b",
        "m24a","m24b","m25a","m25b","m26a","m26b","m27a","m27b",
        "m28a","m28b","m29a","m29b","m30a","m30b","winner"],

  16: ["m8a","m8b","m9a","m9b","m10a","m10b","m11a","m11b",
  "m12a","m12b","m13a","m13b","m14a","m14b","winner"],

  8: ["m4a","m4b","m5a","m5b","m6a","m6b", "winner"],

  4: ["m2a","m2b", "winner"]
}

async function saveMatch(drawSize) {
  var url = window.location.href.substring(
    window.location.href.indexOf("?")
  );
  var params = new URLSearchParams(url);
  var tournamentId = params.get("tournamentId");
  var divName = params.get("div");
  document.getElementById("drawName").textContent = divName;

  var rootRef = firebase.database().ref();
  var tournamentsRef = rootRef.child("tournaments");
  var tournamentRef = tournamentsRef.child(tournamentId);
  var divRef = tournamentsRef.child(tournamentId).child("divisions").child(divName);

  var matchId = "m" + document.getElementById("editMatchModalLabel").textContent.split(" ")[1];
  var winner = "";
  var displayScore = "";
  if (document.getElementById("p1").checked) {
    winner = document.getElementById("p1").value;
    displayScore = document.getElementById("p1s1").value + "-" + document.getElementById("p2s1").value + " " 
    + document.getElementById("p1s2").value + "-" + document.getElementById("p2s2").value + " "
    + document.getElementById("p1s3").value + "-" + document.getElementById("p2s3").value;
  }
  if (document.getElementById("p2").checked) {
    winner = document.getElementById("p2").value;
    displayScore = document.getElementById("p2s1").value + "-" + document.getElementById("p1s1").value + " " 
    + document.getElementById("p2s2").value + "-" + document.getElementById("p1s2").value + " "
    + document.getElementById("p2s3").value + "-" + document.getElementById("p1s3").value;
  }

  var score = document.getElementById("p1s1").value + "-" + document.getElementById("p2s1").value + " " 
    + document.getElementById("p1s2").value + "-" + document.getElementById("p2s2").value + " "
    + document.getElementById("p1s3").value + "-" + document.getElementById("p2s3").value;

  var dayOfWeek = false;
  var tiebreakScores = "";
  await tournamentRef.once("value").then(tss => {
    if (tss.val().drawDateFormat == "Day of week") {
      dayOfWeek = true;
    }
    tiebreakScores = tss.child("divisions").child(divName).child("draw").child(matchId).val().tiebreakScores;
  })

  divRef.child("draw").child(matchId).update({
    "winner": winner,
    "score": score,
    "date": document.getElementById("editMatchDate").value,
    "courtNumber": document.getElementById("matchCourtNumber").value,
    "matchTime": document.getElementById("matchTime").value,
    "location": document.getElementById("editMatchLocationSelect").value
  })

  var matchProgressionList = matchProgressions[drawSize];
  document.getElementById(matchProgressionList[parseInt(matchId.substring(1))]).textContent = formatPlayerNameDrawShorten(winner);

  var detailString = "";
  var date = document.getElementById("editMatchDate").value;
  var time = document.getElementById("matchTime").value;
  var location = document.getElementById("editMatchLocationSelect").value;

  if (date != null && date != "") {
    if (dayOfWeek) {
      detailString += getDayOfTheWeek(date) + " ";
    } else {
      detailString += date.substring(date.indexOf("-")+1) + " ";
    }
  }
  if (time != null && time != "") {
    detailString += convertTimeTo12Hour(time) + " ";
  }
  if (location != null && location != "") {
    detailString += location.substring(location.indexOf(" - ") + 3);
  }
  
  var scoreString = "";
  displayScore.split(" ").forEach(set => {
    if (set.length == 3) {
      scoreString += set + " ";
    }
  });
  document.getElementById(matchId+"score").textContent = scoreString;
  document.getElementById(matchId+"details").textContent = detailString;

  var winnerMatchPlayerId = matchProgressionList[parseInt(matchId.substring(1))];
  var nextMatchId = winnerMatchPlayerId.substring(0, winnerMatchPlayerId.length - 1);
  
  divRef.child("draw").child(nextMatchId).child(winnerMatchPlayerId).set(winner).then(tmp => {
    document.getElementById("savingProgress").textContent = "Saved!"
  });

  if (tiebreakScores == null || tiebreakScores.trim() == "") {
    tiebreakScores = "(-),(-),(-)";
  }

  tiebreakScores = tiebreakScores.replace(/\(/g, "");
  tiebreakScores = tiebreakScores.replace(/\)/g, "");
  var tiebreakScoresSplit = tiebreakScores.split(",");

  var tiebreak = false;
  if (document.getElementById("p1s1").value - document.getElementById("p2s1").value == 1 || 
        document.getElementById("p1s1").value - document.getElementById("p2s1").value == -1) {
    document.getElementById("p1s1t").disabled = false;
    document.getElementById("p2s1t").disabled = false;
    tiebreak = true;
    if (tiebreakScoresSplit[0].split("-").length == 2) {
      document.getElementById("p1s1t").value = tiebreakScoresSplit[0].split("-")[0];
      document.getElementById("p2s1t").value = tiebreakScoresSplit[0].split("-")[1];
    }
  } else {
    document.getElementById("p1s1t").disabled = true;
    document.getElementById("p2s1t").disabled = true;
    document.getElementById("p1s1t").value = "";
    document.getElementById("p2s1t").value = "";
  }

  if (document.getElementById("p1s2").value - document.getElementById("p2s2").value == 1 || 
        document.getElementById("p1s2").value - document.getElementById("p2s2").value == -1) {
    document.getElementById("p1s2t").disabled = false;
    document.getElementById("p2s2t").disabled = false;
    tiebreak = true;
    if (tiebreakScoresSplit[1].split("-").length == 2) {
      document.getElementById("p1s2t").value = tiebreakScoresSplit[1].split("-")[0];
      document.getElementById("p2s2t").value = tiebreakScoresSplit[1].split("-")[1];
    }
  } else {
    document.getElementById("p1s2t").disabled = true;
    document.getElementById("p2s2t").disabled = true;
    document.getElementById("p1s2t").value = "";
    document.getElementById("p2s2t").value = "";
  }

  if (document.getElementById("p1s3").value - document.getElementById("p2s3").value == 1 || 
        document.getElementById("p1s3").value - document.getElementById("p2s3").value == -1) {
    document.getElementById("p1s3t").disabled = false;
    document.getElementById("p2s3t").disabled = false;
    tiebreak = true;
    if (tiebreakScoresSplit[2].split("-").length == 2) {
      document.getElementById("p1s3t").value = tiebreakScoresSplit[2].split("-")[0];
      document.getElementById("p2s3t").value = tiebreakScoresSplit[2].split("-")[1];
    }
  } else {
    document.getElementById("p1s3t").disabled = true;
    document.getElementById("p2s3t").disabled = true;
    document.getElementById("p1s3t").value = "";
    document.getElementById("p2s3t").value = "";
  }

  if (tiebreak) {
    $("#tiebreakModal").modal("toggle");
  } else {
    await divRef.child("draw").child(matchId).update({
      "tiebreakScores": "(-),(-),(-)"
    });
  }
}

async function saveTiebreakScores(drawSize) {
  var url = window.location.href.substring(
    window.location.href.indexOf("?")
  );
  var params = new URLSearchParams(url);
  var tournamentId = params.get("tournamentId");
  var divName = params.get("div");
  document.getElementById("drawName").textContent = divName;

  var rootRef = firebase.database().ref();
  var tournamentsRef = rootRef.child("tournaments");
  var tournamentRef = tournamentsRef.child(tournamentId);
  var divRef = tournamentsRef.child(tournamentId).child("divisions").child(divName);

  var matchId = "m" + document.getElementById("tiebreakModalLabel").textContent.split(" ")[1];
  var winner = "";


  var displayScore = "";
  if (document.getElementById("p1").checked) {
    winner = document.getElementById("p1").value;

    var tiebreakScoresDisplay = "(" + document.getElementById("p1s1t").value + "-" + document.getElementById("p2s1t").value + "),"
    + "(" + document.getElementById("p1s2t").value + "-" + document.getElementById("p2s2t").value + "),"
    + "(" + document.getElementById("p1s3t").value + "-" + document.getElementById("p2s3t").value + ")"

    var tiebreakDisplay = new Array(3);
    var tiebreakScoresSplit = tiebreakScoresDisplay.split(",");
    for (var i = 0; i < tiebreakScoresSplit.length; i++) {
      if (tiebreakScoresSplit[i].length != 3) {
        tiebreakDisplay[i] = tiebreakScoresSplit[i];
      } else {
        tiebreakDisplay[i] = "";
      }
    }
    displayScore = document.getElementById("p1s1").value + "-" + document.getElementById("p2s1").value + tiebreakDisplay[0] + " " 
    + document.getElementById("p1s2").value + "-" + document.getElementById("p2s2").value + tiebreakDisplay[1] + " "
    + document.getElementById("p1s3").value + "-" + document.getElementById("p2s3").value + tiebreakDisplay[2];
  }
  if (document.getElementById("p2").checked) {
    winner = document.getElementById("p2").value;

    var tiebreakScoresDisplay = "(" + document.getElementById("p2s1t").value + "-" + document.getElementById("p1s1t").value + "),"
    + "(" + document.getElementById("p2s2t").value + "-" + document.getElementById("p1s2t").value + "),"
    + "(" + document.getElementById("p2s3t").value + "-" + document.getElementById("p1s3t").value + ")"

    var tiebreakDisplay = new Array(3);
    var tiebreakScoresSplit = tiebreakScoresDisplay.split(",");
    for (var i = 0; i < tiebreakScoresSplit.length; i++) {
      if (tiebreakScoresSplit[i].length != 3) {
        tiebreakDisplay[i] = tiebreakScoresSplit[i];
      } else {
        tiebreakDisplay[i] = "";
      }
    }

    displayScore = document.getElementById("p2s1").value + "-" + document.getElementById("p1s1").value + tiebreakDisplay[0] + " " 
    + document.getElementById("p2s2").value + "-" + document.getElementById("p1s2").value + tiebreakDisplay[1] + " "
    + document.getElementById("p2s3").value + "-" + document.getElementById("p1s3").value + tiebreakDisplay[2];
  }

  var score = document.getElementById("p1s1").value + "-" + document.getElementById("p2s1").value + " " 
    + document.getElementById("p1s2").value + "-" + document.getElementById("p2s2").value + " "
    + document.getElementById("p1s3").value + "-" + document.getElementById("p2s3").value;

  var tiebreakScores = "(" + document.getElementById("p1s1t").value + "-" + document.getElementById("p2s1t").value + "),"
    + "(" + document.getElementById("p1s2t").value + "-" + document.getElementById("p2s2t").value + "),"
    + "(" + document.getElementById("p1s3t").value + "-" + document.getElementById("p2s3t").value + ")"

  var dayOfWeek = false;
  await tournamentRef.once("value").then(tss => {
    if (tss.val().drawDateFormat == "Day of week") {
      dayOfWeek = true;
    }
  })

  divRef.child("draw").child(matchId).update({
    "winner": winner,
    "score": score,
    "date": document.getElementById("editMatchDate").value,
    "courtNumber": document.getElementById("matchCourtNumber").value,
    "matchTime": document.getElementById("matchTime").value,
    "location": document.getElementById("editMatchLocationSelect").value,
    "tiebreakScores": tiebreakScores
  })

  var matchProgressionList = matchProgressions[drawSize];
  document.getElementById(matchProgressionList[parseInt(matchId.substring(1))]).textContent = formatPlayerNameDrawShorten(winner);

  var detailString = "";
  var date = document.getElementById("editMatchDate").value;
  var time = document.getElementById("matchTime").value;
  var location = document.getElementById("editMatchLocationSelect").value;

  if (date != null && date != "") {
    if (dayOfWeek) {
      detailString += getDayOfTheWeek(date) + " ";
    } else {
      detailString += date.substring(date.indexOf("-")+1) + " ";
    }
  }
  if (time != null && time != "") {
    detailString += convertTimeTo12Hour(time) + " ";
  }
  if (location != null && location != "") {
    detailString += location.substring(location.indexOf(" - ") + 3);
  }
  
  var scoreString = "";
  displayScore.split(" ").forEach(set => {
    if (set.length >= 3) {
      scoreString += set + " ";
    }
  });
  document.getElementById(matchId+"score").textContent = scoreString;
  document.getElementById(matchId+"details").textContent = detailString;

  var winnerMatchPlayerId = matchProgressionList[parseInt(matchId.substring(1))];
  var matchId = winnerMatchPlayerId.substring(0, winnerMatchPlayerId.length - 1);
  
  divRef.child("draw").child(matchId).child(winnerMatchPlayerId).set(winner).then(tmp => {
    document.getElementById("savingProgress").textContent = "Saved!"
  });
}

function editMatch(matchId) {
  var url = window.location.href.substring(
    window.location.href.indexOf("?")
  );
  var params = new URLSearchParams(url);
  var tournamentId = params.get("tournamentId");
  var divName = params.get("div");
  document.getElementById("drawName").textContent = divName;

  var rootRef = firebase.database().ref();
  var tournamentsRef = rootRef.child("tournaments");
  var tournamentRef = tournamentsRef.child(tournamentId);
  var divRef = tournamentRef.child("divisions").child(divName);
  var matchNumber = parseInt(matchId.substring(1));
  document.getElementById("editMatchModalLabel").textContent = "Match " + matchNumber;
  document.getElementById("tiebreakModalLabel").textContent = "Match " + matchNumber + " Tiebreak scores";

  divRef.once("value").then(ss => {
    var p1 = ss.child("draw").child(matchId).child(matchId+"a").val();
    var p2 = ss.child("draw").child(matchId).child(matchId+"b").val();
    var date = ss.child("draw").child(matchId).child("date").val();
    var time = ss.child("draw").child(matchId).child("matchTime").val()
    var courtNumber = ss.child("draw").child(matchId).child("courtNumber").val();
    var location = ss.child("draw").child(matchId).child("location").val();

    var score = ["-","-","-"];
    if (ss.child("draw").child(matchId).child("score").val() != null) {
      score = ss.child("draw").child(matchId).child("score").val().split(" ");
    }

    document.getElementById("p1").value = p1;
    document.getElementById("p1Label").textContent = formatPlayerNameDrawEdit(p1);
    document.getElementById("p1LabelTiebreak").textContent = formatPlayerNameDrawEdit(p1);
    if (p1 == null || p1 == "" || p1.split(",").length == 1) {
      document.getElementById("p1LabelTeam").textContent = "";
      document.getElementById("p1LabelTeamTiebreak").textContent = "";
    } else {
      document.getElementById("p1LabelTeam").textContent = p1.split(",")[1].trim(" ");
      document.getElementById("p1LabelTeamTiebreak").textContent = p1.split(",")[1].trim(" ");
    }
    document.getElementById("p2").value = p2;
    document.getElementById("p2Label").textContent = formatPlayerNameDrawEdit(p2);
    document.getElementById("p2LabelTiebreak").textContent = formatPlayerNameDrawEdit(p2);
    if (p2 == null || p2 == "" || p2.split(",").length == 1) {
      document.getElementById("p2LabelTeam").textContent = "";
      document.getElementById("p2LabelTeamTiebreak").textContent = "";
    } else {
      document.getElementById("p2LabelTeam").textContent = p2.split(",")[1].trim(" ");
      document.getElementById("p2LabelTeamTiebreak").textContent = p2.split(",")[1].trim(" ");
    }
    document.getElementById("matchCourtNumber").value = courtNumber;
    document.getElementById("matchTime").value = time;
    document.getElementById("editMatchDate").value = date;
    document.getElementById("editMatchLocationSelect").value = location;
    
    if (score[0].length == 3) {
      document.getElementById("p1s1").value = score[0][0];
      document.getElementById("p2s1").value = score[0][2];
    } else {
      document.getElementById("p1s1").value = "";
      document.getElementById("p2s1").value = "";
    }
    if (score[1].length == 3) {
      document.getElementById("p1s2").value = score[1][0];
      document.getElementById("p2s2").value = score[1][2];
    } else {
      document.getElementById("p1s2").value = "";
      document.getElementById("p2s2").value = "";
    }
    if (score[2].length == 3) {
      document.getElementById("p1s3").value = score[2][0];
      document.getElementById("p2s3").value = score[2][2];
    } else {
      document.getElementById("p1s3").value = "";
      document.getElementById("p2s3").value = "";
    }

    var winner = ss.child("draw").child(matchId).child("winner").val();
    
    document.getElementById("p1").checked = false;
    document.getElementById("p2").checked = false;
    if (winner != null && winner != "" && winner == p1) {
      document.getElementById("p1").checked = true;
    }
    if (winner != null && winner != "" && winner == p2) {
      document.getElementById("p2").checked = true;
    }
  });
}


function saveDraw(drawSize, matchId, matchPlayerId) {
  document.getElementById("savingProgress").textContent = "Saving..."
  var url = window.location.href.substring(
    window.location.href.indexOf("?")
  );
  var params = new URLSearchParams(url);
  var tournamentId = params.get("tournamentId");
  var divName = params.get("div");
  document.getElementById("drawName").textContent = divName;

  var rootRef = firebase.database().ref();
  var tournamentsRef = rootRef.child("tournaments");
  var divRef = tournamentsRef.child(tournamentId).child("divisions").child(divName);
  var matchNumber = parseInt(matchId.substring(1));

  if (matchNumber < drawSize / 2) {
    divRef.child("draw").child(matchId).child(matchPlayerId).set(document.getElementById(matchPlayerId).value).then(tmp => {
      document.getElementById("savingProgress").textContent = "Saved!"
    });
  } else {
    divRef.child("draw").child(matchId).child(matchPlayerId).set(document.getElementById(matchPlayerId).textContent).then(tmp => {
      document.getElementById("savingProgress").textContent = "Saved!"
    });
  }
}

function clearMatchWinner() {
  document.getElementById("p1").checked = false;
  document.getElementById("p2").checked = false;

  document.getElementById("p1s1").value = "";
  document.getElementById("p2s1").value = "";
  document.getElementById("p1s2").value = "";
  document.getElementById("p2s2").value = "";
  document.getElementById("p1s3").value = "";
  document.getElementById("p2s3").value = "";
}