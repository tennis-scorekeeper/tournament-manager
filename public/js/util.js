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
    var result = "";
    if (parts.length == 2) {
        result = parts[0] + ", " + parts[1];
    }
    else if (parts.length != 3) {
        return name;
    }
    else if (parts.length == 3) {
        result = parts[0] + ", " + parts[1];
        result += " (" + parts[2] + ")";
    }
    if (result.length >= 27) {
        var lastSpace = 0;
        for (var i = 0; i < parts[0].length; i++) {
            if (parts[0][i] == " ") {
                lastSpace = i;
            }
        }
        result = result.substring(lastSpace);

        var maxTeamName = 21 - parts[0].substring(lastSpace).length;
        if (parts[1].length > maxTeamName) {
            result = parts[0].substring(lastSpace) + ", " + parts[1].substring(0,maxTeamName-3) + "...";
            if (parts.length == 3) {
                result += " (" + parts[2] + ")";
            }
        }
    }
    return result;
}

function formatPlayerNameDrawEdit(name) {
    if (name == null) {
        return "";
    }
    var parts = name.split(",");
    if (parts.length == 2) {
        return parts[0] + ", " + parts[1];
    }
    if (parts.length != 3) {
        return name;
    }
    var result = parts[0] + ", " + parts[1];
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
    if (parts.length == 2) {
        var namesplit = parts[0].split(" ");
        if (namesplit.length == 2) {
            return namesplit[1];
        } else {
            return namesplit[0];
        }
    }
    if (parts.length != 3) {
        return name;
    }
    var namesplit = parts[0].split(" ");
    var result = "";
    if (namesplit.length == 2) {
        result += namesplit[1];
    } else {
        result += namesplit[0];
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