-- Update the remaining hourly salaries to KSH for Kenya market
UPDATE jobs 
SET salary = CASE 
  WHEN salary = '£9.50/hour' THEN 'KSH 200/hour'
  WHEN salary = '£10.00/hour' THEN 'KSH 220/hour'
  WHEN salary = '£12.00/hour + fuel allowance' THEN 'KSH 280/hour + fuel allowance'
  ELSE salary
END
WHERE salary LIKE '%£%';