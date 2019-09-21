function formatPlayerNameSchedule(name) {
    if (name == null) {
        return "";
    }
    var parts = name.split(",");
    var result = parts[0] + " (" + parts[1] + ")";
    if (parts.length == 3) {
        result += " [" + parts[2] + "]";
    }
    return result;
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
        if (parts[1].length > maxTeamName) {
            result = lastName + ", " + parts[1].substring(0,maxTeamName-3) + "...";
            if (parts.length == 3) {
                result += " (" + parts[2] + ")";
            }
        }
    } else if (doubles && result.length >= 26) {
        var maxTeamName = 20 - doubles1.length - doubles2.length;
        if (parts[1].length > maxTeamName) {
            result = doubles1 + "/" + doubles2 + ", " + parts[1].substring(0,maxTeamName-3) + "...";
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
            return doubles1 + "/" + doubles2 + ", " + parts[1];
        } else {
            return parts[0] + ", " + parts[1];
        }
    }
    if (parts.length != 3) {
        return name;
    }
    var result = "";
    if (doubles) {
        result = doubles1 + "/" + doubles2 + ", " + parts[1];
    } else {
        result = parts[0] + ", " + parts[1];
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
    return input.match("^[a-zA-Z0-9- \/,]+$") != null;
}