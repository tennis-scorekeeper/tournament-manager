function formatPlayerNameSchedule(name) {
    if (name == null) {
        return "";
    }
    var parts = name.split(",");
    var result = parts[0];
    if (parts.length == 3) {
        result += " [" + parts[2] + "]";
    }
    return result;
}

function getPlayerTeam(name) {
    if (name == null) {
        return "";
    }
    return name.split(",")[1];
}

function formatPlayerNameDraw(name) {
    if (name == null) {
        return "";
    }
    var parts = name.split(",");
    var doubles1 = "";
    var doubles2 = "";
    var doubles = false;
    var lastName = getlastName(parts[0]);
    if (parts[0].includes("/")) {
        var doublesSplit = parts[0].split("/");
        doubles1 = getlastName(doublesSplit[0]);
        doubles2 = getlastName(doublesSplit[1]);
        doubles = true;
    }

    var result = "";
    if (parts.length == 2) {
        if (doubles) {
            result = doubles1 + "/" + doubles2 + ", " + parts[1];
        } else {
            result = lastName + ", " + parts[1];
        }
    }
    else if (parts.length != 3) {
        return name;
    }
    else if (parts.length == 3) {
        if (doubles) {
            result = doubles1 + "/" + doubles2 + ", " + parts[1];
        } else {
            result = lastName + ", " + parts[1];
        }
        result += " (" + parts[2] + ")";
    }
    if (result.length >= 26 && !doubles) {
        var maxTeamName = 21 - lastName.length;
        if (parts.length == 3) {
            maxTeamName -= 3;
        }
        if (parts[1].length > maxTeamName) {
            result = lastName + ", " + parts[1].substring(0,maxTeamName-3) + "..";
            if (parts.length == 3) {
                result += " (" + parts[2] + ")";
            }
        }
    } else if (doubles && result.length >= 26) {
        var maxTeamName = 20 - doubles1.length - doubles2.length;
        if (parts.length == 3) {
            maxTeamName -= 3;
        }
        if (parts[1].length > maxTeamName) {
            result = doubles1 + "/" + doubles2 + ", " + parts[1].substring(0,maxTeamName-3) + "..";
            if (result.length >= 22) {
                result = result.substring(0, result.indexOf(","));
            }
            if (parts.length == 3) {
                result += " (" + parts[2] + ")";
            }
        }
    }
    return result;
}

function getlastName(name) {
    name = name.trim(" ");
    var lastSpace = 0;
    for (var i = 0; i < name.length; i++) {
        if (name[i] == " ") {
            lastSpace = i;
        }
    }
    return name.substring(lastSpace).trim(" ");
}

function getLastNameOrDoublesNames(fullName) {
    if (fullName == null) {
        return "";
    }
    var parts = fullName.split(",");
    var doubles1 = "";
    var doubles2 = "";
    var lastName = getlastName(parts[0]);
    if (parts[0].includes("/")) {
        var doublesSplit = parts[0].split("/");
        doubles1 = getlastName(doublesSplit[0]);
        doubles2 = getlastName(doublesSplit[1]);
        return doubles1 + "/" + doubles2;
    }
    return lastName;
}

function formatPlayerNameDrawEdit(name) {
    if (name == null) {
        return "";
    }
    var parts = name.split(",");
    var doubles1 = "";
    var doubles2 = "";
    var doubles = false;
    if (parts[0].includes("/")) {
        var doublesSplit = parts[0].split("/");
        doubles1 = getlastName(doublesSplit[0]);
        doubles2 = getlastName(doublesSplit[1]);
        doubles = true;
    }
    if (parts.length == 2) {
        if (doubles) {
            return doubles1 + "/" + doubles2;
        } else {
            return parts[0];
        }
    }
    if (parts.length != 3) {
        return name;
    }
    var result = "";
    if (doubles) {
        result = doubles1 + "/" + doubles2;
    } else {
        result = parts[0];
    }
    if (parts.length == 3) {
        result += " (" + parts[2] + ")";
    }
    return result;
}

function formatDrawNameToDBFormat(name) {
    if (name == null) {
        return "";
    }
    var parts = name.split(",");
    var result = "";
    if (parts.length == 2) {
        result += parts[0] + ",";
        var parts2 = parts[1].split(" (");
        result += parts2[0].trim(" ");
        if (parts2.length == 2) {
            result += "," + parts2[1].split(")")[0];
        }
        return result;
    } else {
        return name;
    }
}

function formatPlayerNameDrawShorten(name) {
    if (name == null) {
        return "";
    }
    var parts = name.split(",");
    var doubles1 = "";
    var doubles2 = "";
    var doubles = false;
    if (parts[0].includes("/")) {
        var doublesSplit = parts[0].split("/");
        doubles1 = getlastName(doublesSplit[0]);
        doubles2 = getlastName(doublesSplit[1]);
        doubles = true;
    }
    if (parts.length == 2) {
        if (doubles) {
            return doubles1 + "/" + doubles2;
        } else {
            return getlastName(parts[0]);
        }
    }
    if (parts.length != 3) {
        return name;
    }
    var result = "";
    if (doubles) {
        result += doubles1 + "/" + doubles2;
        if (result.length > 20) {
            result = result.substring(0, 18) + "..";
        }
    } else {
        result += getlastName(parts[0]);
    }
    if (parts.length == 3) {
        result += " (" + parts[2] + ")";
    }
    return result;
}

function getRoundName(matchNumber, drawSize) {
    var calc = drawSize - matchNumber;
    if (calc == 2) {
        return "Finals"
    } else if (calc <= 4) {
        return "Semifinals"
    } else if (calc <= 8) {
        return "Quarterfinals"
    } else {
        if (matchNumber < drawSize / 2) {
            return "Round of " + drawSize;
        } else if (matchNumber < ((drawSize / 2) + (drawSize / 4))) {
            return "Round of " + (drawSize / 2);
        } else if (matchNumber < ((drawSize / 2) + (drawSize / 4) + (drawSize / 8))) { 
            return "Round of " + (drawSize / 4);
        } else if (matchNumber < ((drawSize / 2) + (drawSize / 4) + (drawSize / 8) + (drawSize / 16))) { 
            return "Round of " + (drawSize / 8);
        } else if (matchNumber < ((drawSize / 2) + (drawSize / 4) + (drawSize / 8) + (drawSize / 16) + (drawSize / 32))) { 
            return "Round of " + (drawSize / 16);
        }
    }
}

function checkIfValidForFBKey(input) {
    return input.match("^[a-zA-Z0-9- \/,']+$") != null;
}

var drawProgressions = {
    128: ["64a","64b","65a","65b","66a","66b","67a","67b",
    "68a","68b","69a","69b","70a","70b","71a","71b","72a","72b",
    "73a","73b","74a","74b","75a","75b","76a","76b","77a","77b",
    "78a","78b","79a","79b","80a","80b","81a","81b","82a","82b",
    "83a","83b","84a","84b","85a","85b","86a","86b","87a","87b",
    "88a","88b","89a","89b","90a","90b","91a","91b","92a","92b",
    "93a","93b","94a","94b","95a","95b","96a","96b","97a","97b",
    "98a","98b","99a","99b","100a","100b","101a","101b","102a","102b",
    "103a","103b","104a","104b","105a","105b","106a","106b","107a","107b",
    "108a","108b","109a","109b","110a","110b","111a","111b","112a","112b",
    "113a","113b","114a","114b","115a","115b","116a","116b","117a","117b",
    "118a","118b","119a","119b","120a","120b","121a","121b","122a","122b",
    "123a","123b","124a","125a","124b","125b","126a","126b",],

    64: ["32a","32b","33a","33b","34a","34b","35a","35b",
    "36a","36b","37a","37b","38a","38b","39a","39b",
    "40a","40b","41a","41b","42a","42b","43a","43b",
    "44a","44b","45a","45b","46a","46b","47a","47b",
    "48a","48b","49a","49b","50a","50b","51a","51b",
    "52a","52b","53a","53b","54a","54b","55a","55b",
    "56a","56b","57a","57b","58a","58b","59a","59b",
    "60a","60b","61a","61b","62a","62b"],

    32: ["16a","16b","17a","17b","18a","18b","19a","19b",
    "20a","20b","21a","21b","22a","22b","23a","23b",
    "24a","24b","25a","25b","26a","26b","27a","27b",
    "28a","28b","29a","29b","30a","30b"],

    16: ["8a","8b","9a","9b","10a","10b","11a","11b",
    "12a","12b","13a","13b","14a","14b"],

    8: ["4a","4b","5a","5b","6a","6b"],

    4: ["2a","2b"]
}

function formatScoreLoadDraw(score, tiebreakScores, flip) {
    if (score == null) {
        score = "";
    }
    if (tiebreakScores == null || tiebreakScores.trim() == "") {
        tiebreakScores = "(-),(-),(-)";
    }
    if (flip) {
        score = flipScore(score);
        tiebreakScores = flipTiebreakScores(tiebreakScores);
    }

    var result = "";
    var sets = score.split(" ");
    var tiebreakSets = tiebreakScores.split(",");

    for (var i = 0; i < sets.length; i++) {
        if (sets[i].length >= 3) {
            if (tiebreakSets[i].length > 3) {
                result += sets[i] + tiebreakSets[i] + " ";
            } else {
                result += sets[i] + " ";
            }
        }
    }
    return result.trim(" ");
}

function flipScore(score) {
    if (score == null || score.trim() == "") {
        return "";
    }
    var result = "";
    var sets = score.split(" ");
    sets.forEach(set => {
        if (set.split("-").length == 2) {
            result += set.split("-")[1] + "-" + set.split("-")[0] + " ";
        }
    });
    return result.trim(" ");
}

function flipTiebreakScores(tiebreakScores) {
    if (tiebreakScores == null || tiebreakScores.trim() == "") {
        return "(-),(-),(-)";
    }
    var result = "";
    tiebreakScores = tiebreakScores.replace(/\(/g, "");
    tiebreakScores = tiebreakScores.replace(/\)/g, "");
    var sets =  tiebreakScores.split(",");
    sets.forEach(set => {
        if (set.split("-").length == 2) {
            result += "(" + set.split("-")[1] + "-" + set.split("-")[0] + "),";
        }
    })
    return result.trim(",");
}

function convertTimeTo12Hour(time) {
    if (time == null || time.trim() == "") {
        return "";
    }
    var hour = parseInt(time.split(":")[0]);
    var minutes = parseInt(time.split(":")[1]);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    var result = "";
    if (hour == 0) {
        result = "12:" + minutes + " AM";
    } 
    else if (hour == 12) {
        result = hour + ":" + minutes + " PM";
    }
    else if (hour > 12) {
        result = hour-12 + ":" + minutes + " PM";
    }
    else {
        result = hour + ":" + minutes + " AM";
    }
    return result;
}

function getDayOfTheWeek(date) {
    if (date == null || date == "") {
        return "";
    }
    var tmp = new Date(date);
    tmp.setDate(tmp.getDate()+1);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var tmpString = tmp.toLocaleDateString("en-US", options);
    var dayMapping = {"Saturday":"Sa", "Sunday":"Su", "Monday":"M", "Tuesday":"T", "Wednesday":"W", "Thursday":"Th", "Friday":"F"};
    return dayMapping[tmpString.substring(0, tmpString.indexOf(","))];
}