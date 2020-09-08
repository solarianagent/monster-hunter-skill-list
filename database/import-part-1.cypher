// Import Skills with Translations
LOAD CSV WITH HEADERS FROM 'file:///source_data/skills/skill_base_translations.csv' AS row
WITH row, keys(row) as columns
UNWIND columns AS column
WITH row, column WHERE column STARTS WITH "name_"
WITH row, replace(column, "name_", "") as languageCode
MERGE(skill:Skill {name: row["name_"+languageCode], language:languageCode})
  ON CREATE SET skill.description = row["description_"+languageCode];

// Setup Skill Index
CREATE INDEX skillName FOR (s:Skill) ON (s.name, s.language);

// Associate English Skill Names to Other Skills they translate to
// Need to do this because english skill name is primary key in csv
LOAD CSV WITH HEADERS FROM 'file:///source_data/skills/skill_base_translations.csv' AS row
MATCH(englishSkill:Skill {name: row.name_en, language: "en"})
WITH englishSkill, row, keys(row) as columns
UNWIND columns AS column
WITH englishSkill, row, column WHERE column STARTS WITH "name_" AND NOT column ENDS WITH "en"
WITH englishSkill, row, replace(column, "name_", "") as languageCode
MATCH(skill:Skill {name: row["name_"+languageCode], language: languageCode})
  MERGE(englishSkill)-[:TRANSLATES_TO]->(skill);

// Sets up Armor
LOAD CSV WITH HEADERS FROM 'file:///source_data/armors/armor_base_translations.csv' AS row
WITH row, keys(row) as columns
UNWIND columns AS column
WITH row, column WHERE column STARTS WITH "name_"
WITH row[column] as name, replace(column, "name_", "") as languageCode
CREATE(armor:Armor {name: name, language:languageCode});

// Setups Up Armor Index
CREATE INDEX armorName FOR (a:Armor) ON (a.name, a.language);