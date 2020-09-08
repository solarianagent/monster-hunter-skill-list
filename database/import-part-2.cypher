// Had to Split this Out to give it enough RAM
LOAD CSV WITH HEADERS FROM 'file:///source_data/armors/armor_base_translations.csv' AS row
MATCH(englishArmor:Armor {name: row.name_en, language: "en"})
WITH englishArmor, row, keys(row) as columns
UNWIND columns AS column
WITH englishArmor, row, column WHERE column STARTS WITH "name_" AND NOT column ENDS WITH "en"
WITH englishArmor, row, replace(column, "name_", "") as languageCode
MATCH(armor:Armor {name: row["name_"+languageCode], language: languageCode})
 CREATE (englishArmor)-[:TRANSLATES_TO]->(armor);

// Load In Slots
LOAD CSV WITH HEADERS FROM 'file:///source_data/armors/armor_base.csv' AS row
MATCH(enArmor:Armor {name: row.name_en, language: "en"})
  SET enArmor.slot = row.type
WITH enArmor, row
MATCH(enArmor)-[:TRANSLATES_TO]->(armor:Armor)
  SET armor.slot = row.type;

// Load in Create Skill Relationships
LOAD CSV WITH HEADERS FROM 'file:///source_data/armors/armor_skills_ext.csv' AS row
WITH row WHERE row.skill1_name IS NOT NULL
MATCH(enArmor:Armor {name: row.base_name_en, language: "en"})
MATCH(enSkill:Skill {name: row.skill1_name, language: "en"})
  CREATE (enSkill)-[:ATTACHED_TO]->(enArmor)
WITH enArmor, enSkill
MATCH(enArmor)-[:TRANSLATES_TO]->(armor:Armor)
MATCH(enSkill)-[:TRANSLATES_TO]->(skill: Skill {language: armor.language})
  CREATE (skill)-[:ATTACHED_TO]->(armor);

LOAD CSV WITH HEADERS FROM 'file:///source_data/armors/armor_skills_ext.csv' AS row
WITH row WHERE row.skill2_name IS NOT NULL
MATCH(enArmor:Armor {name: row.base_name_en, language: "en"})
MATCH(enSkill:Skill {name: row.skill2_name, language: "en"})
  CREATE (enSkill)-[:ATTACHED_TO]->(enArmor)
WITH enArmor, enSkill
MATCH(enArmor)-[:TRANSLATES_TO]->(armor:Armor)
MATCH(enSkill)-[:TRANSLATES_TO]->(skill: Skill {language: armor.language})
  CREATE (skill)-[:ATTACHED_TO]->(armor);
